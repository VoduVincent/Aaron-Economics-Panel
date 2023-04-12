import sqlite3 from 'sqlite3';
import { City } from './schema.ts';

export async function cityTick(year:number): Promise<undefined> {
    // Acquire the Data from sqlite3
    const db = new sqlite3.Database(`./data/${year}.db`, (err) =>{
        if (err){
            console.log(err)
        }
        else{
            console.log("Connected with Database CityTick")
        }
    })

    // Get all the City Data from the Data
    db.each("SELECT * FROM city", (err,row:City) => {
        if (err) {
            return
        }
        const newNetProsperity = (row.prosperityRegional + row.prosperityRegional + row.terrain + row.literacy + row.trade + row.specialPop + row.popGrowthMod)
        const annualGrowth = (row.terrain + row.warPop + row.healthcareSpending + row.popGrowthMod + row.colonialBoost + row.resourceBoost + newNetProsperity + 1.5) / 100;
        const newPopulation = Math.round((row.pop * (1+annualGrowth)))

        console.log(row.pop *(1 + annualGrowth))

    //Apply new Population before doing Income
    db.run("UPDATE city SET pop = ?, netProsperity = ? WHERE id = ?",[newPopulation,newNetProsperity,row.id], (err2)=> {
        if (err2) {
            console.log(err2)
          }
    })
    })
    db.close()
    return undefined
}