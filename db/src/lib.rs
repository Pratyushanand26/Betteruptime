pub mod schema;
pub mod config;

use diesel::prelude::*;
use std::env;

use crate::config::Config;

pub struct Db{
  pub conn:PgConnection
}

impl Db {
    fn default() -> Result<Self, ConnectionError> {
        let config=Config::default();
        // 2. Try to establish a Postgres connection
        let conn = PgConnection::establish(&config.db_url)?;

        Ok(Self {
            conn,
        })
    }
}


impl Db{

    pub fn add_website(&self){

    }

   pub fn create_user(&self)->String{
       String::from("123")
    }
}