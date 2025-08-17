use serde::{Serialize,Deserialize};

#[derive(Serialize,Deserialize)]

pub struct CreateWebsiteInput{
    pub url:String
}

#[derive(Serialize,Deserialize)]
pub struct Inputuser{
    pub username:String,
    pub password:String
}