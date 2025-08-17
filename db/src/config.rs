use std::env::{self};

use dotenvy::dotenv;



pub struct Config{
    pub db_url:String
}

impl Default for Config{
   fn default() -> Self {
    dotenv().ok();
       let db_url=env::var("DATABASE_URL")
       .unwrap_or_else(|_| panic!("please provide the database url in env file"));

    Self{
    db_url
    }
   }

}



