import * as sqlite3 from 'sqlite3';
import { City } from './schema';

export async function cityTick(year:number): Promise<undefined> {
    // Acquire the Data from sqlite3
    const db = new sqlite3.Database(`./data/${year}.db`)

    // Get all the City Data from the Data
    db.each("SELECT * FROM city", (err,row:City) => {
        if (err) {
            return
        }

    const annualGrowth = (row.terrain + row.warPop + row.healthcareSpending + row.popGrowthMod + row.colonialBoost + row.resourceBoost + 1) / 100;
    const newPopulation = (row.pop * (1+annualGrowth))

    //Apply new Population before doing Income
    db.run("UPDATE city SET pop = ? WERE id = ?",[newPopulation,row.id], (err2)=> {
        if (err2) {
            return;
          }
        console.log(`Set new Population for City ID ${row.id}`)
    })
    })
    db.close()
    return undefined
}