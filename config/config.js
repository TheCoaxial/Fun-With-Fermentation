require("dotenv").config();

module.exports = {

  "development": {
    "username":  "root",
    "password": "Cj9a7xb3012!",
    "database": "testdb",
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
  },
}

// module.exports = {
//   HOST: "localhost",
//   USER: "root",
//   PASSWORD: "Cj9a7xb3012!",
//   DB: "testdb",
//   dialect: "mysql",
// };