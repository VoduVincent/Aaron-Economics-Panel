import { prisma } from "$lib/handler/db/prisma";
import { json, type RequestHandler } from "@sveltejs/kit";

import Papa from "papaparse";

export async function GET({url}) {
    const month_param = Number(url.searchParams.get("month") ?? 1)

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

    const data = {
        month:month,
        planet:planet,
        surface:surface,
        nation:nation,
        resource:resource,
        resource_type:resource_type,
        species:species,
        city:city
    }
    return json(data)
    }
}