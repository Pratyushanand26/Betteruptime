use std::sync::{Arc, Mutex};
use poem::{
    handler,web::{Data, Json, Path}
};
use crate::{auth_middleware::UserId, request_input::CreateWebsiteInput, request_output::{CreateWebsiteOutput, GetWebsiteOutput}};
use db::db::Db;

#[handler]
pub fn get_website(Path(id): Path<String>,Data(s):Data<&Arc<Mutex<Db>>>,UserId(user_id):UserId)->Json<GetWebsiteOutput>{
    let mut locked_s=s.lock().unwrap();
    let website=locked_s.get_website(id,user_id).unwrap();
    let response=GetWebsiteOutput { url: website.url,id:website.id };
    Json(response)
}

#[handler]
pub fn create_website(Json(data):Json<CreateWebsiteInput>,Data(s):Data<&Arc<Mutex<Db>>>,UserId(user_id):UserId)-> Json<CreateWebsiteOutput> {
   let url=data.url;
   let mut locked_s=s.lock().unwrap();
   let website=locked_s.create_website(user_id,url).unwrap();

   let response=CreateWebsiteOutput { id: website.id };
   Json(response)
}

#[handler]
pub fn get_websites(Json(data):Json<CreateWebsiteInput>,Data(s):Data<&Arc<Mutex<Db>>>,UserId(user_id):UserId)-> Json<CreateWebsiteOutput> {
   let url=data.url;
   let mut locked_s=s.lock().unwrap();
   let website=locked_s.create_website(user_id,url).unwrap();

   let response=CreateWebsiteOutput { id: website.id };
   Json(response)
}