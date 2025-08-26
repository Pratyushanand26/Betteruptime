use std::sync::{Arc, Mutex};
use poem::{
     handler, http::StatusCode, web::{Data, Json}, Error
};
use crate::{request_input::{CreateUserInput}, request_output::{CreateUserOutput, SigninOutput}};
use db::db::Db;

use serde::{Serialize, Deserialize};
use jsonwebtoken::{encode, decode, Header, Algorithm, Validation, EncodingKey, DecodingKey};

/// Our claims struct, it needs to derive `Serialize` and/or `Deserialize`
#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String,
    exp: usize,
}

#[handler]
pub fn sign_up(Json(data):Json<CreateUserInput>,Data(s):Data<&Arc<Mutex<Db>>>)->Result<Json<CreateUserOutput>,Error>{
    let mut locked_s=s.lock().unwrap();
    let id=locked_s.sign_up(data.username, data.password).map_err(|_| Error::from_status(StatusCode::CONFLICT))?;

    let response=CreateUserOutput{
     id
    };
    Ok(Json(response))
}

#[handler]
pub fn sign_in(Json(data):Json<CreateUserInput>,Data(s):Data<&Arc<Mutex<Db>>>)->Result<Json<SigninOutput>,Error>{
    let mut locked_s=s.lock().unwrap();
    let user_id=locked_s.sign_in(data.username, data.password);

    match user_id{
        Ok(user_id)=>{
            let my_claims= Claims {
                exp:111111111111111,        
                sub: user_id,
            };
            let token = encode(&Header::default(), &my_claims, &EncodingKey::from_secret("secret".as_ref())).map_err(|_|Error::from_status(StatusCode::UNAUTHORIZED))?;

            let response=SigninOutput{jwt:token};
          Ok(Json(response))
        },
        Err(_)=> Err(Error::from_status(StatusCode::UNAUTHORIZED))
    }
}