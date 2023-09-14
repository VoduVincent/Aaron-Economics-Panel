import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { PrismaClient } from '@prisma/client';

import Database from "better-sqlite3"
import * as fs from "fs"

export const POST: RequestHandler = ({ url }) => {

	const wantsTick = (url.searchParams.get('wantsTick') ?? false);
    const year = Number((url.searchParams.get('year')));

    // Make sure we actually want the tick
    if (wantsTick == false){
        throw error(400,"Tick is not actually wanted yet was still requested")
    }
    
    // Make sure the year is actually there
    if (year == 0){
        throw error(400,"Could not find the requested year in the URL")
    }

    let prisma = new PrismaClient()

    if(prisma == undefined){
        throw error(400,"Failed to connect to the Earth Database")
    }



    prisma.$disconnect
    return new Response(`Year ${year} was Ticked Successfully`)

}
