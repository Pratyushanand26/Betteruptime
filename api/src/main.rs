pub mod routes;
pub mod request_input;
pub mod request_output;
pub mod auth_middleware;

use std::sync::{Arc, Mutex};
use poem::{
    get, handler, EndpointExt,listener::TcpListener, post, web::{Data, Json}, Route, Server
};
use crate::{request_input::CreateUserInput, request_output::{CreateUserOutput, SigninOutput}, routes::{user::{sign_in, sign_up}, website::{create_website, get_website}}};
use db::db::Db;

#[tokio::main]
async fn main() -> Result<(), std::io::Error> {

    let  s=Arc::new(Mutex::new(Db::new().unwrap()));
    let app = Route::new()
        .at("/status/:website_id", get(get_website))
        .at("/website",post(create_website))
        .at("/user/signin",post(sign_in))
        .at("/user/signup",post(sign_up))
        .data(s);

    Server::new(TcpListener::bind("0.0.0.0:3003"))
        .name("hello-world")
        .run(app)
        .await
}