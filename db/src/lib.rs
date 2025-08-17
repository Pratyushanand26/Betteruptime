pub mod schema;
pub mod config;
pub mod db;
pub mod models;

use diesel::prelude::*;
use std::env;

use crate::config::Config;

