const express= require('express');
const app=express();
const path=require('path');
const request=require('request');
require('dotenv').config();

const port=process.env.PORT||4000;
const publicpath= path.join(__dirname,'/public');
const fetch =require('node-fetch');

app.use(express.static(publicpath));
app.use(express.urlencoded());
app.use(express.json());
app.get('/',(req,res)=>{
    res.render('index');
})

const k= process.env.key;
app.get('/:location',async(req,res)=>{
    const city=req.params.location;
    const api=`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${k}`;
    const fetch_response= await fetch(api);
    const json =await fetch_response.json();
    res.json(json);
});

app.listen(port, ()=>{
    console.log(`server running at ${port}`);
});