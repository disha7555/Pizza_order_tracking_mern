require('dotenv').config();
const express=require('express');
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const port=process.env.PORT || 3303;
const app=express();

const router=require('./routes/auth_route');

app.use(express.json());


require('./utils/connection');

app.use("/api/auth", router);

app.listen(port,()=>{
    console.log(`listening to the port ${port}`);
});