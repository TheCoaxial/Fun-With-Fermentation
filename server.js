const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");

let corsOptions = {
  origin: "https://salty-sea-99414.herokuapp.com"
};

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
  corsOptions = {
    origin: "http://localhost:3001"
  };
}

const app = express();
app.use(cors()) 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let PORT = process.env.EXPRESS_PORT || 3001;

//routes
require("./controller/api-routes")(app);
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static('./client/build'));
  PORT = process.env.PORT;
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
} else{
  app.use(express.static("public"));
}

db.sequelize.sync({}).then(() => {
  app.listen(PORT, () => console.log(`server is listening http://localhost:${PORT}`));
});