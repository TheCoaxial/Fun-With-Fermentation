const express= require("express");

const app =express();


const PORT= process.env.EXPRESS_PORT ||8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT);

console.log(`server is listening on port ${PORT}`);