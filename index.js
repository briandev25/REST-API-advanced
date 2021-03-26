const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app =express();
require('dotenv/config')
const userRoute = require('./routes/api/users');


app.use(bodyParser.json())
app.use('/users',userRoute);


app.get('/', (req,res) =>{
   res.send("Home")
})

mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true,useUnifiedTopology: true },()=>{
    console.log("Connected to MongoDB");
})

app.listen(4000);