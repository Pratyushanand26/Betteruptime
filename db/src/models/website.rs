use chrono::Utc;
use diesel::prelude::*;
use diesel::ExpressionMethods; 
use uuid::Uuid;

use crate::db::Db;

#[derive(Queryable, Insertable,Selectable)]
#[diesel(table_name = crate::schema::website)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Website{
    pub id:String,
    pub url:String,
    pub user_id:String,
    pub time_added:chrono::NaiveDateTime,
}


impl Db{
    pub fn create_website(&mut self,user_id:String,url:String)->Result<Website,diesel::result::Error>{
       let id=Uuid::new_v4();
       let website=Website{
           id:id.to_string(),
           url,
           user_id,
           time_added:Utc::now().naive_utc()
       };
       diesel::insert_into(crate::schema::website::table)
        .values(&website)
        .returning(Website::as_returning())
        .get_result(&mut self.conn)?;

       Ok(website)
    }

   pub fn get_website(&mut self,input_id:String)->Result<Website,diesel::result::Error>{
    use crate::schema::website::dsl::*;

    let website_result=website
        .filter(id.eq(input_id))
        .select(Website::as_select())
        .first(&mut self.conn)?;
   
   Ok(website_result)
   }
}