use std::env;
use std::time::Instant;
use tokio::time::Duration;
use tokio::sync::Semaphore;
use futures::stream::{FuturesUnordered, StreamExt};

use diesel::prelude::*;
use diesel_async::{AsyncConnection, RunQueryDsl, AsyncPgConnection};
use reqwest::Client;

use redisstream::{init_redis, ensure_group_exists, x_read_group, x_ack_bulk, StreamMessage};

mod schema {
    // include your generated schema
}

#[derive(Insertable)]
#[table_name = "website_ticks"] // ensure matches your schema module path
struct NewTick {
    website_id: uuid::Uuid,
    response_time_ms: i32,
    status: String,
    region_id: String,
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    tracing_subscriber::fmt::init();

    let redis_url = env::var("REDIS_URL").unwrap_or_else(|_| "redis://127.0.0.1/".into());
    let database_url = env::var("DATABASE_URL")?;
    let region_id = env::var("REGION_ID").expect("REGION_ID");
    let worker_id = env::var("WORKER_ID").expect("WORKER_ID");

    init_redis(&redis_url).await?;
    // Ensure consumer group exists
    ensure_group_exists(&region_id).await?;

    // DB connection
    let mut db = AsyncPgConnection::establish(&database_url).await?;

    // HTTP client with default timeout
    let http = Client::builder().timeout(Duration::from_secs(10)).build()?;

    // concurrency limit for in-flight HTTP checks (adjust)
    let concurrency_limit = 20usize;
    let sem = Semaphore::new(concurrency_limit);

    loop {
        // Read up to count messages, block up to 5s (5000 ms) if none
        let opt_msgs = x_read_group(&region_id, &worker_id, 5, 5000).await?;

        let msgs = match opt_msgs {
            Some(m) if !m.is_empty() => m,
            _ => continue,
        };

        // For each message, spawn a future to process it (bounded)
        let mut futs = FuturesUnordered::new();
        let mut ids_to_ack = Vec::with_capacity(msgs.len());

        for msg in msgs.into_iter() {
            ids_to_ack.push(msg.id.clone());

            let db_conn = db.clone(); // diesel_async connections are cheaply clonable handles (if using pool; otherwise use pool)
            let http = http.clone();
            let region = region_id.clone();
            let sem_permit = sem.clone().acquire_owned().await.unwrap();

            futs.push(tokio::spawn(async move {
                // permit dropped when function returns (release concurrency slot)
                let _permit = sem_permit;

                let start = Instant::now();
                // fetch website
                let result = http.get(&msg.message.url).send().await;

                let dt_ms = start.elapsed().as_millis().min(i64::from(i32::MAX as i64)) as i32;
                let status_str = match result {
                    Ok(resp) if resp.status().is_success() => "Up".to_string(),
                    _ => "Down".to_string(),
                };

                // insert tick into DB
                // adapt insert logic to your schema & Diesel models
                let new_tick = NewTick {
                    website_id: uuid::Uuid::parse_str(&msg.message.id).unwrap(),
                    response_time_ms: dt_ms,
                    status: status_str,
                    region_id: region.clone(),
                };

                // Insert (run in async)
                // This assumes you have a website_ticks table & Diesel Insertable derive properly setup
                diesel::insert_into(schema::website_ticks::table)
                    .values(&new_tick)
                    .execute(&mut db_conn.into_inner()) // adjust to your connection/ pool usage
                    .await?;

                anyhow::Ok::<(), anyhow::Error>(())
            }));
        }

        // Wait for all processing to finish
        while let Some(res) = futs.next().await {
            match res {
                Ok(Ok(())) => {}
                Ok(Err(e)) => tracing::error!("processing error: {:?}", e),
                Err(e) => tracing::error!("task panicked: {:?}", e),
            }
        }

        // Ack processed messages in bulk
        x_ack_bulk(&region_id, &ids_to_ack).await?;
        tracing::info!("processed and acked {} messages", ids_to_ack.len());
    }
}
