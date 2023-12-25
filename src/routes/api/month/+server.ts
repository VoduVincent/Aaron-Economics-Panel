import { prisma } from "$lib/handler/db/prisma";
import type { RequestHandler } from "@sveltejs/kit";

import {unparse} from 'papaparse';


export async function GET({url}) {
    const month_param = Number(url.searchParams.get("month") ?? 1)
    const csv_param = Number(url.searchParams.get("csv") ?? 0)

    if( await prisma.month.findUnique({
        where:{
            id:month_param
        }
    }))
    {
        const month = await prisma.month.findUnique({where:{id:month_param}})
        const planet = await prisma.month.findUnique({where:{id:month_param}}).planet()
        const surface = await prisma.month.findUnique({where:{id:month_param}}).surface()
        const nation = await prisma.month.findUnique({where:{id:month_param}}).nation()
        const resource = await prisma.month.findUnique({where:{id:month_param}}).resource()
        const resource_type = await prisma.month.findUnique({where:{id:month_param}}).resource_type()
        const species = await prisma.month.findUnique({where:{id:month_param}}).species()
        const city = await prisma.month.findUnique({where:{id:month_param}}).city()

    if (csv_param){
            const data = [
                {month},
                {planet},
                {surface},
                {nation},
                {resource},
                {resource_type},
                {species},
                {city}
            ]
            return new Response(unparse(data))
        }
    }
    else{
        return new Response("How about you give me a month that actually exists dumbass")
    }

    return new Response("This code and seethe aaron")

}