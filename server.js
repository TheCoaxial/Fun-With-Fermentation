if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// const passport = require("passport");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

let corsOptions = {
  origin: "https://salty-sea-99414.herokuapp.com"
};

if (process.env.NODE_ENV !== "production") {
  corsOptions = {
    origin: "http://localhost:3001"
  };

}


const db = require("./models");

app.use(cors()) 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('./client/build'));
// Simple test route
app.get("/", (req, res) => {
  res.json({ message: "Test route" });
});

let PORT = process.env.EXPRESS_PORT || 3001;

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

if (process.env.NODE_ENV === "production") {
  PORT = process.env.PORT;
}

//routes
require("./controller/api-routes")(app);
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

db.sequelize.sync({}).then(() => {
  app.listen(PORT, () => {
    console.log(`server is listening http://localhost:${PORT}`);
  });

});


