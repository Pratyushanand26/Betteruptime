
pub mod request_input;
pub mod request_output;

use poem::{
    get, handler, listener::TcpListener, post, web::{Json, Path}, Route, Server
};
use crate::{request_input::{CreateUserInput, CreateWebsiteInput}, request_output::{CreateUserOutput, CreateWebsiteOutput, GetWebsiteOutput, SigninOutput}};
use db::db::Db;

#[handler]
fn get_website(Path(website_id): Path<String>)->Json<GetWebsiteOutput>{
    let mut s=Db::new().unwrap();
    let website=s.get_website(website_id).unwrap();
    let response=GetWebsiteOutput { url: website.url };
    Json(response)
}

#[handler]
fn create_website(Json(data):Json<CreateWebsiteInput>)-> Json<CreateWebsiteOutput> {
   let url=data.url;
   let mut s=Db::new().unwrap();
   let website=s.create_website(String::from("!"), url).unwrap();

   let response=CreateWebsiteOutput { id: website.id };
   Json(response)
}

#[handler]
fn signup(Json(data):Json<CreateUserInput>)->Json<CreateUserOutput>{
    let mut s=Db::new().unwrap();
    let id=s.sign_up(data.username, data.password).unwrap();

    let response=CreateUserOutput{
     id
    };
    Json(response)
}

#[handler]
fn signin(Json(data):Json<CreateUserInput>)->Json<SigninOutput>{
    let mut s=Db::new().unwrap();
    let _exists=s.sign_in(data.username, data.password).unwrap();

    let response=SigninOutput{
     jwt:String::from("pratyush")
    };
    Json(response)
}

#[tokio::main]
async fn main() -> Result<(), std::io::Error> {

    let app = Route::new()
        .at("/website/:website_id", get(get_website))
        .at("/website",post(create_website))
        .at("/user/signin",post(signin))
        .at("/user/signup",post(signup));

    Server::new(TcpListener::bind("0.0.0.0:3003"))
        .name("hello-world")
        .run(app)
        .await
}