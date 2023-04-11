const express = require("express")
const fs = require("fs")
const path = require('path');
const app = express()

import {cityTick} from "./citytick"
const port = 8000;
const host = "127.0.0.1";



//CSV Handler
//csvtojson = require("csvtojson")
//json2csv = require("json2csv")

//app.use(express.static('../data/'))

app.get("/", function(req,res) {
    res.sendFile(__dirname + '/index.html');
})

app.post("/",function(req,res){
    console.log("Ticking")
    //Start the Tick
    cityTick(1926)
})


var server = app.listen(port, function () {
    console.log("Example app listening at http://%s:%s", host, port)
 })