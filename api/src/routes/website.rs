use std::sync::{Arc, Mutex};
use poem::{
    handler,web::{Data, Json, Path}
};
use crate::{request_input::{CreateWebsiteInput}, request_output::{CreateWebsiteOutput, GetWebsiteOutput}};
use db::db::Db;

#[handler]
pub fn get_website(Path(website_id): Path<String>,Data(s):Data<&Arc<Mutex<Db>>>)->Json<GetWebsiteOutput>{
    let mut locked_s=s.lock().unwrap();
    let website=locked_s.get_website(website_id).unwrap();
    let response=GetWebsiteOutput { url: website.url };
    Json(response)
}

#[handler]
pub fn create_website(Json(data):Json<CreateWebsiteInput>,Data(s):Data<&Arc<Mutex<Db>>>)-> Json<CreateWebsiteOutput> {
   let url=data.url;
   let mut locked_s=s.lock().unwrap();
   let website=locked_s.create_website(String::from("!"), url).unwrap();

   let response=CreateWebsiteOutput { id: website.id };
   Json(response)
}