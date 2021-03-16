require("dotenv").config();

module.exports = {

  "development": {
    "username": process.env.NAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect":"mysql"
  }
}