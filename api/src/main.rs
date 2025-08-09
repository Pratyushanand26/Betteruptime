
pub mod request_input;
pub mod request_output;

use poem::{
    get, handler, listener::TcpListener, middleware::Tracing, post, web::{Json, Path}, EndpointExt, Route, Server
};
use crate::{request_input::CreateWebsiteInput, request_output::CreateWebsiteOutput};
use db::Db;

#[handler]
fn get_website(Path(website_id): Path<String>)->Json<String>   {
   Json(String::from("hi"))
}

#[handler]
fn create_website(Json(data):Json<CreateWebsiteInput>)-> Json<CreateWebsiteOutput> {
   let url=data.url;

   let d=Db{};
   let id=d.create_user();

   let response=CreateWebsiteOutput{
    id:id
   };
   Json(response)
}

#[tokio::main]
async fn main() -> Result<(), std::io::Error> {

    let app = Route::new()
        .at("/website/:website_id", get(get_website))
        .at("/website",post(create_website));
    Server::new(TcpListener::bind("0.0.0.0:3003"))
        .name("hello-world")
        .run(app)
        .await
}