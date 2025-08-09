pub mod schema;

use diesel::prelude::*;
use std::env;

pub struct Db{
  pub conn:PgConnection
}

impl Default for Db {
    fn default() -> Result<Self, ConnectionError> {
        // 1. Read the DATABASE_URL from the environment, or panic if missing
        let db_url: String = env::var("DATABASE_URL")
            .unwrap_or_else(|_| panic!("Please provide the database_url environment variable"));

        // 2. Try to establish a Postgres connection
        let connection: PgConnection = PgConnection::establish(&db_url)
            .unwrap_or_else(|_| panic!("Error connecting to {}", db_url));

        // 3. Wrap that connection in your Store and return
        Ok(Self {
            connection,
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