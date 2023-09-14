import { json } from 'stream/consumers';
import type { RequestHandler } from '../$types';


import { PrismaClient } from '@prisma/client'

export const GET: RequestHandler = async ({ url }) => {

    const year = Number((url.searchParams.get('year')));

    let prisma = new PrismaClient()

    const response = await prisma.city.findMany({where: {
        year: year
    }})


    return new Response(JSON.stringify(response))
}