if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// const passport = require("passport");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3001"
};

const db = require("./models");

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Simple test route
app.get("/", (req, res) => {
  res.json({ message: "Test route" });
});

const PORT = process.env.EXPRESS_PORT || 3001;

//routes
require("./controller/api-routes")(app);
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

db.sequelize.sync({force:true }).then(() => {
  app.listen(PORT, () => {
    console.log(`server is listening http://localhost:${PORT}`);
  });

});


