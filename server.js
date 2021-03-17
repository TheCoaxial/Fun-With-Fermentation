const express = require("express");
const path =require("path");

const app = express();


const PORT = process.env.EXPRESS_PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Link express server to react build
app.use(express.static("./client/build/static"));

app.listen(PORT);

console.log(`server is listening http://localhost:${PORT}`);