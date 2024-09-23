require('dotenv').config();
const express=require('express');
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const port=process.env.PORT || 3303;
const app=express();

const router=

app.use(express.json());

require('./connection');
app.listen(port,()=>{
    console.log(`listening to the port ${port}`);
});