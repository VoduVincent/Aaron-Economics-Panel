import express, { Express, Request, Response } from 'express';
import fs from "fs";
import path from "path";
const app = express()

import {cityTick} from "./citytick.ts"
const port = 8000;
const host = "127.0.0.1";

import { URL } from 'url';
const myUrl = new URL(import.meta.url);
const __dirname = path.dirname(myUrl.pathname.substring(1));
console.log(__dirname)
app.get("/", function(req:any,res:any) {
    res.sendFile(__dirname + '/index.html');
})

app.post("/",function(req:Request,res:Response){
    console.log("Ticking")
    //Find next year
    const dirPath = './data';
    const dbFilePattern = /\.db$/;
    let highestYearNumber = 0;

    fs.readdirSync(dirPath).forEach((fileName) => {
    if (dbFilePattern.test(fileName)) {
        const yearNumber = parseInt(path.basename(fileName, '.db'), 10);
        if (yearNumber > highestYearNumber) {
        highestYearNumber = yearNumber;
        }
    }
    });

    const nextYearNumber = highestYearNumber + 1;
    console.log(`The highest year number is ${highestYearNumber}, and the next year number is ${nextYearNumber}`);
    //Make new Database file for the new Year
    fs.copyFileSync(`./data/${highestYearNumber}.db`,`./data/${nextYearNumber}.db`)
    //Start the Tick
    cityTick(nextYearNumber)
})


var server = app.listen(port, function () {
    console.log("Example app listening at http://%s:%s", host, port)
 })