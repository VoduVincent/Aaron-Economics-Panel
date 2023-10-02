import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import fetch from 'node-fetch';

import Database from 'better-sqlite3';

import { EARTH_URL } from '$env/static/private';

export const POST: RequestHandler = async ({ url }) => {

	const wantsTick = (url.searchParams.get('wantsTick') ?? false);
    const year = Number((url.searchParams.get('year')));
    const month = Number((url.searchParams.get('month')));

    // Make sure we actually want the tick
    if (wantsTick == false){
        throw error(400,"Tick is not actually wanted yet was still requested")
    }
    
    // Make sure the year is actually there
    if (year == 0){
        throw error(400,"Could not find the requested year in the URL")
    }

    const db = await new Database("EARTH_URL");
    db.pragma('journal_mode = WAL');
    db.pragma("busy_timeout = 50000");

    console.log(db)

    if (db == undefined){
        throw error(400,"Could not Connect to the Earth Database")
    }

    // City Tick

    const all_cities_respose = await fetch(`${url.origin}/api/earth/data/city/?year=${year}&month=${month}`) 

    let all_cities
    all_cities = await all_cities_respose.json()
    console.log("Tick Start")
    //Calc new NetProsperity

    all_cities.forEach(async (row:any) => { 

        let newNetProsperity = (Number(row.prosperityRegional) + Number(row.prosperityRegional) + Number(row.terrain) + Number(row.literacy) + Number(row.trade) + Number(row.specialPop) + Number(row.popGrowthMod))
        let annualGrowth = (row.terrain + row.warPop + row.healthcareSpending + row.popGrowthMod + row.colonialBoost + row.resourceBoost + newNetProsperity + 1.5) /100;
        let newPopulation = Math.round((row.pop * (1+annualGrowth)**(month/12) ))

        let newIncome = Math.round( ( (1+ newNetProsperity)*((row.taxBaseIndustry*newPopulation)*row.tax) / 12) )

        let newYear = year
        let newMonth = row.month

        if (row.month == 12){
            newYear = year + 1
            newMonth = 1
        }
        else {
            newMonth = row.month + 1
        }


        db.prepare(
            `
            INSERT INTO city (
                year,
                month,
                empire,
                name,
                pop,
                tax,
                prosperityRegional,
                prosperityNational,
                landInfra,
                seaInfra,
                terrain,
                literacy,
                warPop,
                trade,
                capital,
                specialPop,
                specialProd,
                healthcareSpending,
                popTaxMod,
                popGrowthMod,
                colonialBoost,
                resourceIncome,
                resourceBoost,
                taxBaseIndustry,
                specialEconomicNotes,
                netProsperity,
                netIncome,
                resourcesNotes,
                surface,
                occupiedBy,
                resistance
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            `
        ).run(
            newYear,
            newMonth,
            row.empire,
            row.name,
            newPopulation,
            row.tax,
            row.prosperityRegional,
            row.prosperityNational,
            row.landInfra,
            row.seaInfra,
            row.terrain,
            row.literacy,
            row.warPop,
            row.trade,
            row.capital,
            row.specialPop,
            row.specialProd,
            row.healthcareSpending,
            row.popTaxMod,
            row.popGrowthMod,
            row.colonialBoost,
            row.resourceIncome,
            row.resourceBoost,
            row.taxBaseIndustry,
            row.specialEconomicNotes,
            row.newNetProsperity,
            newIncome,
            row.resourcesNotes,
            row.surface,
            row.occupiedBy,
            row.resistance
        );

    })
    console.log("Updated cities for this Month")

    

    db.close()
    return new Response(`Year ${year} was Ticked Successfully`)

}
