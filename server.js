require("dotenv").config();
// const passport = require("passport");
const express = require("express");
const path =require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:3001"
  };

const db = require("./models");

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(passport.initialize());
// Passport config
// passport.use( require("./config/jwtPassportStrategy") );

app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
  });

const PORT = process.env.EXPRESS_PORT || 3001;

//routes
require("./controller/api-routes")(app);
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

db.sequelize.sync({force: true}).then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is listening http://localhost:${PORT}`);
    });
    // initial();
});


// function initial() {
//     Role.create({
//       id: 1,
//       name: "user"
//     });
   
//     Role.create({
//       id: 2,
//       name: "moderator"
//     });
   
//     Role.create({
//       id: 3,
//       name: "admin"
//     });
//   }