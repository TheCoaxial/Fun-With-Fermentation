const express = require("express");
const path =require("path");

const app = express();

const db = require("./models");


const PORT = process.env.EXPRESS_PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



db.sequelize.sync().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is listening http://localhost:${PORT}`);
    });
});
