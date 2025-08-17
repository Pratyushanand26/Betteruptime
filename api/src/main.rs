
pub mod request_input;
pub mod request_output;

use poem::{
    get, handler, http::response, listener::TcpListener, middleware::Tracing, post, web::{Json, Path}, EndpointExt, Route, Server
};
use crate::{request_input::CreateWebsiteInput, request_output::CreateWebsiteOutput};
use db::db::Db;

#[handler]
fn get_website(Path(website_id): Path<String>)->Json<String>   {
   Json(String::from("hi"))
}

#[handler]
fn create_website(Json(data):Json<CreateWebsiteInput>)-> Json<CreateWebsiteOutput> {
   let url=data.url;
   let mut s=Db::default().unwrap();
   let website=s.create_website(String::from("!"), url).unwrap();

   let response=CreateWebsiteOutput { id: website.id };
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