use redis::{aio::Connection, AsyncCommands, Client, RedisError, Value};
use serde::Deserialize;
use tokio::sync::OnceCell;

/// Stream name used by pusher & workers (same as Node code)
const STREAM_NAME: &str = "betteruptime:website";

static REDIS_CLIENT: OnceCell<Client> = OnceCell::const_new();

pub async fn init_redis(url: &str) -> Result<(), RedisError> {
    let client = Client::open(url)?;
    REDIS_CLIENT.set(client).map_err(|_| {
        RedisError::from((redis::ErrorKind::IoError, "failed to set redis client"))
    })?;
    Ok(())
}

async fn get_conn() -> Result<Connection, RedisError> {
    let client = REDIS_CLIENT
        .get()
        .expect("redis client must be initialized with init_redis");
    client.get_async_connection().await
}

#[derive(Debug, Deserialize)]
pub struct WebsiteEvent {
    pub url: String,
    pub id: String, // website id
}

#[derive(Debug)]
pub struct StreamMessage {
    pub id: String,
    pub message: WebsiteEvent,
}

/// Pipeline XADD for a batch of websites (keeps same shape as your Node xAddBulk)
pub async fn x_add_bulk(events: &[WebsiteEvent]) -> Result<(), RedisError> {
    let mut conn = get_conn().await?;

    // Build a pipeline to reduce RTTs
    let mut pipe = redis::pipe();
    for e in events {
        // XADD stream * url <url> id <id>
        pipe.cmd("XADD")
            .arg(STREAM_NAME)
            .arg("*")
            .arg("url")
            .arg(&e.url)
            .arg("id")
            .arg(&e.id)
            .ignore();
    }

    pipe.query_async(&mut conn).await?;
    Ok(())
}

/// Read from consumer group. Returns list of messages (id + parsed fields)
/// consumer_group = region id; consumer = worker id
///
/// This returns up to `count` messages, blocks up to `block_ms`.
pub async fn x_read_group(
    consumer_group: &str,
    consumer: &str,
    count: usize,
    block_ms: usize,
) -> Result<Option<Vec<StreamMessage>>, RedisError> {
    let mut conn = get_conn().await?;

    // XREADGROUP GROUP <group> <consumer> BLOCK <block_ms> COUNT <count> STREAMS <stream> >
    let res: Value = redis::cmd("XREADGROUP")
        .arg("GROUP")
        .arg(consumer_group)
        .arg(consumer)
        .arg("BLOCK")
        .arg(block_ms)
        .arg("COUNT")
        .arg(count)
        .arg("STREAMS")
        .arg(STREAM_NAME)
        .arg(">") // new messages
        .query_async(&mut conn)
        .await?;

    // Parse the nested redis::Value into our StreamMessage vec
    // If no messages -> some redis versions return Nil or empty array
    match res {
        Value::Nil => Ok(None),
        Value::Bulk(top) if top.is_empty() => Ok(None),
        Value::Bulk(mut top) => {
            // top is an array of streams; for our case only one stream expected
            // typical form: [[stream_name, [[id, [field1, val1, field2, val2]], ...]]]
            // We'll parse defensively.
            let mut msgs = Vec::new();

            for stream_ent in top {
                if let Value::Bulk(mut stream_arr) = stream_ent {
                    // stream_arr[1] should be the messages
                    if stream_arr.len() >= 2 {
                        if let Value::Bulk(messages) = stream_arr.swap_remove(1) {
                            for msg in messages {
                                if let Value::Bulk(mut pair) = msg {
                                    if pair.len() >= 2 {
                                        // pair[0] = id, pair[1] = fields array
                                        let id_val = pair.swap_remove(0);
                                        let fields_val = pair.swap_remove(0);

                                        let id = match id_val {
                                            Value::Data(d) => String::from_utf8_lossy(&d).to_string(),
                                            Value::Bulk(_) => continue,
                                            _ => continue,
                                        };

                                        // fields array: [field1, val1, field2, val2, ...]
                                        let mut url = None;
                                        let mut wid = None;
                                        if let Value::Bulk(fields) = fields_val {
                                            let mut iter = fields.into_iter();
                                            while let (Some(k), Some(v)) = (iter.next(), iter.next()) {
                                                if let Value::Data(kb) = k {
                                                    let key = String::from_utf8_lossy(&kb).to_string();
                                                    if let Value::Data(vb) = v {
                                                        let val =
                                                            String::from_utf8_lossy(&vb).to_string();
                                                        match key.as_str() {
                                                            "url" => url = Some(val),
                                                            "id" => wid = Some(val),
                                                            _ => {}
                                                        }
                                                    }
                                                }
                                            }
                                        }

                                        if let (Some(url), Some(wid)) = (url, wid) {
                                            msgs.push(StreamMessage {
                                                id,
                                                message: WebsiteEvent { url, id: wid },
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            Ok(Some(msgs))
        }
        other => {
            // unexpected shape
            tracing::warn!("x_read_group unexpected reply: {:?}", other);
            Ok(None)
        }
    }
}

/// XACK multiple ids in a single call
pub async fn x_ack_bulk(consumer_group: &str, ids: &[String]) -> Result<(), RedisError> {
    if ids.is_empty() {
        return Ok(());
    }
    let mut conn = get_conn().await?;

    let mut cmd = redis::cmd("XACK");
    cmd.arg(STREAM_NAME).arg(consumer_group);
    for id in ids {
        cmd.arg(id);
    }
    cmd.query_async(&mut conn).await?;
    Ok(())
}

/// Create group if missing (ignore BUSYGROUP)
pub async fn ensure_group_exists(consumer_group: &str) -> Result<(), RedisError> {
    let mut conn = get_conn().await?;
    let res = redis::cmd("XGROUP")
        .arg("CREATE")
        .arg(STREAM_NAME)
        .arg(consumer_group)
        .arg("0") // start at beginning
        .arg("MKSTREAM")
        .query_async::<_, ()>(&mut conn)
        .await;

    match res {
        Ok(_) => Ok(()),
        Err(e) => {
            let s = e.to_string();
            if s.contains("BUSYGROUP") {
                // group already exists — fine
                Ok(())
            } else {
                Err(e)
            }
        }
    }
}
