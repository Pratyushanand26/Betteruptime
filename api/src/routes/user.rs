use std::sync::{Arc, Mutex};
use poem::{
     handler, web::{Data, Json}
};
use crate::{request_input::{CreateUserInput}, request_output::{CreateUserOutput, SigninOutput}};
use db::db::Db;

#[handler]
pub fn signup(Json(data):Json<CreateUserInput>,Data(s):Data<&Arc<Mutex<Db>>>)->Json<CreateUserOutput>{
    let mut locked_s=s.lock().unwrap();
    let id=locked_s.sign_up(data.username, data.password).unwrap();

    let response=CreateUserOutput{
     id
    };
    Json(response)
}

#[handler]
pub fn signin(Json(data):Json<CreateUserInput>,Data(s):Data<&Arc<Mutex<Db>>>)->Json<SigninOutput>{
    let mut locked_s=s.lock().unwrap();
    let _exists=locked_s.sign_in(data.username, data.password).unwrap();

    let response=SigninOutput{
     jwt:String::from("pratyush")
    };
    Json(response)
}