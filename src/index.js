const express = require("express")
const fs = require("fs")

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
async function tick() {

    //Reading all the diffrent files to find out the largest number, wich is thr current year
    let datadir = fs.readdirSync("data")

    datadir.sort(function(a,b){
        return b - a
    })
    current_year = datadir[0].replace(/\.[^/.]+$/, "")

    //Load Current Years CSV as JSON
    year_json = await csvtojson().fromFile("./data/" + current_year + ".csv")

    //Calculate new Net Prosperity
    await year_json.forEach(element => element["Net_Prosperity"] = Number(element["Prosperity_Regional"]) + Number(element["Prosperity_National"]) + Number(element["Road_Level"]) + Number(element["Trade"]) + Number(element["Capital"]) + Number(element["Special_Mod"]) + Number(element["Pop_Tax"]) + Number(element["Literacy"]))

    //Calculate new Population
    await year_json.forEach(element => element["Pop"] = Math.round(Number(element["Pop"]) * (((Number(element["Pop_Growth_Mod"]) + Number(element["Colonial_Boost"]) + Number(element["Resource_Income"]) + Number(element["Healthcare_Spending"]) + Number(element["Terrain"]) + Number(element["War_Population"])) + 1.5) / 100) + 1) )

    //Calculate New Income
    await year_json.forEach(element => element["Net_Income"] = (1 + Number(element["Net_Prosperity"])) * ((Number(element["Tax_Base_Industry"]*element["Pop"]) * Number(element["Tax"])) ))


    let parser = new json2csv.AsyncParser()
    
    let newJson = JSON.stringify(year_json)

    let csv = await parser.parse(year_json).promise()
    
    fs.writeFileSync("./data/" + (Number(current_year) + 1) + ".csv",csv)

    console.log("Tick Complete")
}
app.post("/",function(req,res){
    console.log("Ticking")
    //Start the Tick
    tick()
})


var server = app.listen(port, function () {
    console.log("Example app listening at http://%s:%s", host, port)
 })