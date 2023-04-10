const express = require("express")
const fs = require("fs")
const path = require('path');
const app = express()

const port = 8000;
const host = "127.0.0.1";



//CSV Handler
csvtojson = require("csvtojson")
json2csv = require("json2csv")

app.use(express.static('../data/'))

app.get("/", function(req,res) {
    res.sendFile(__dirname + '/index.html');
})


async function cityTick() {
    console.time("Execution Time")
    //Reading all the diffrent files to find out the largest number, wich is thr current year 
    let datadir = fs.readdirSync("data/cities/")

    console.log(datadir)

    datadir.sort(function(a,b){
        return Number(b.replace(/\.[^/.]+$/, "")) - Number(a.replace(/\.[^/.]+$/, "")) 
    })
    current_year = datadir[0].replace(/\.[^/.]+$/, "")

    //Load Current Years City CSV as JSON
    year_json = await csvtojson().fromFile(`./data/cities/${current_year}.csv`)

    //Calculate new Net Prosperity
    await year_json.forEach(element => element["Net_Prosperity"] = Number(element["Prosperity_Regional"]) + Number(element["Prosperity_National"]) + Number(element["Road_Level"]) + Number(element["Trade"]) + Number(element["Capital"]) + Number(element["Special_Mod"]) + Number(element["Pop_Tax"]) + Number(element["Literacy"]))

    //Calculate new Population
    await year_json.forEach(element => element["Pop"] = Math.round(element["Pop"] * (((Number(element["Terrain"]) + Number(element["War_Population"]) +Number(element["Healthcare_Spending"]) + Number(element["Pop_Growth_Mod"]) + Number(element["Colonial_Boost"]) + Number(element["Resource_Boost"]) + Number(element["Net_Prosperity"]) + 1.5 ) / 100 ) + 1)))

    //Calculate New Income
    await year_json.forEach(element => element["Net_Income"] = (1 + Number(element["Net_Prosperity"])) * ((Number(element["Tax_Base_Industry"]*element["Pop"]) * Number(element["Tax"])) ))


    let parser = new json2csv.AsyncParser()
    
    let newJson = JSON.stringify(year_json)

    let csv = await parser.parse(year_json).promise()
    
    fs.writeFileSync("./data/cities/" + (Number(current_year) + 1) + ".csv",csv)
    console.log("City Tick Complete")
    console.timeEnd("Execution Time")
}

async function nationTick(){
    console.time("Execution Time")
    //Reading all the diffrent files to find out the largest number, wich is thr current year 
    let datadir = fs.readdirSync("data/nations/")

    console.log(datadir)

    datadir.sort(function(a,b){
        return Number(b.replace(/\.[^/.]+$/, "")) - Number(a.replace(/\.[^/.]+$/, "")) 
    })
    current_year = datadir[0].replace(/\.[^/.]+$/, "")

    console.log("Nation Tick Complete")
    console.timeEnd("Execution Time")
}

app.post("/",function(req,res){
    console.log("Ticking")
    //Start the Tick
    cityTick()

    //nationTick()
})


var server = app.listen(port, function () {
    console.log("Example app listening at http://%s:%s", host, port)
 })