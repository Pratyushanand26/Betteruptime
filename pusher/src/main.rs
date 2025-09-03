use diesel::prelude::*;
use diesel_async::{AsyncConnection, RunQueryDsl, AsyncPgConnection};
use std::env;
use tokio::time::{sleep, Duration};
use serde::Deserialize;
use redisstream::{init_redis, x_add_bulk, WebsiteEvent};

mod schema {
    // include your generated schema here (or use crate::api::schema if already present)
    // e.g. include!("../../api/src/schema.rs");
}

#[derive(Queryable, Debug, Deserialize)]
struct Website {
    id: uuid::Uuid,
    url: String,
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    tracing_subscriber::fmt::init();

    // load env vars
    let database_url = env::var("DATABASE_URL")?;
    let redis_url = env::var("REDIS_URL").unwrap_or_else(|_| "redis://127.0.0.1/".into());

    // Initialize redis client
    init_redis(&redis_url).await?;

    // Diesel async connection
    let mut db = AsyncPgConnection::establish(&database_url).await?;

    // Create ticking loop; your Node code runs main() and setInterval(main, 3min)
    loop {
        // fetch websites
        // use your schema::websites here
        use crate::schema::websites::dsl::*;
        let rows: Vec<Website> = websites
            .select((id, url))
            .load::<Website>(&mut db)
            .await?;

        // map to WebsiteEvent for redisstream
        let events: Vec<WebsiteEvent> = rows
            .into_iter()
            .map(|w| WebsiteEvent {
                url: w.url,
                id: w.id.to_string(),
            })
            .collect();

        // push to redis in pipeline
        if !events.is_empty() {
            x_add_bulk(&events).await?;
            tracing::info!("pushed {} websites to stream", events.len());
        }

        // sleep 3 minutes (same as your node interval)
        sleep(Duration::from_secs(3 * 60)).await;
    }
}
