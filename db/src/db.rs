use diesel::{Connection, ConnectionError, PgConnection};

use crate::config::Config;

pub struct Db{
  pub conn:PgConnection
}

impl Db {
    pub fn new() -> Result<Self, ConnectionError> {
        let config=Config::default();
        // 2. Try to establish a Postgres connection
        let conn = PgConnection::establish(&config.db_url)?;

        Ok(Self {
            conn,
        })
    }
}