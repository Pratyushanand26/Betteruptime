pub mod routes;
pub mod request_input;
pub mod request_output;

use std::sync::{Arc, Mutex};
use poem::{
    get, handler, EndpointExt,listener::TcpListener, post, web::{Data, Json, Path}, Route, Server
};
use crate::{request_input::{CreateUserInput, CreateWebsiteInput}, request_output::{CreateUserOutput, CreateWebsiteOutput, GetWebsiteOutput, SigninOutput}, routes::website::{create_website, get_website}};
use db::db::Db;


#[handler]
fn signup(Json(data):Json<CreateUserInput>,Data(s):Data<&Arc<Mutex<Db>>>)->Json<CreateUserOutput>{
    let mut locked_s=s.lock().unwrap();
    let id=locked_s.sign_up(data.username, data.password).unwrap();

    let response=CreateUserOutput{
     id
    };
    Json(response)
}

#[handler]
fn signin(Json(data):Json<CreateUserInput>,Data(s):Data<&Arc<Mutex<Db>>>)->Json<SigninOutput>{
    let mut locked_s=s.lock().unwrap();
    let _exists=locked_s.sign_in(data.username, data.password).unwrap();

    let response=SigninOutput{
     jwt:String::from("pratyush")
    };
    Json(response)
}

#[tokio::main]
async fn main() -> Result<(), std::io::Error> {

    let mut s=Arc::new(Mutex::new(Db::new().unwrap()));
    let app = Route::new()
        .at("/website/:website_id", get(get_website))
        .at("/website",post(create_website))
        .at("/user/signin",post(signin))
        .at("/user/signup",post(signup))
        .data(s);

    Server::new(TcpListener::bind("0.0.0.0:3003"))
        .name("hello-world")
        .run(app)
        .await
}