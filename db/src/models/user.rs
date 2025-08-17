use std::string;
use diesel::{dsl::Values, prelude::*, query_dsl::methods::FilterDsl};
use uuid::Uuid;
use crate::db::Db;


#[derive(Queryable, Insertable,Selectable)]
#[diesel(table_name = crate::schema::user)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct User{
    id:String,
    username:String,
    password:String
}

impl Db{
    pub fn sign_up(&mut self,username:String,password:String)->Result<String,diesel::result::Error>{
        let id=Uuid::new_v4();
        let u=User{
        id:id.to_string(),
        username:username,
        password:password,
        };

        diesel::insert_into(crate::schema::user::table)
        .values(&u)
        .returning(User::as_returning())
        .get_result(&mut self.conn)?;

        Ok(id.to_string())
    }

   pub fn sign_in(&mut self,input_username:String,input_passwprd:String)->Result<bool,diesel::result::Error>{
    use crate::schema::user::dsl::{user as users_table, username, password};

    let user_result=users_table
               .filter(username.eq(input_username))
               .select(User::as_select())
               .first(& self.conn)?;
    
    if password!=user_result.password{
        return Ok(false);
    }
    Ok(true)
    }
}