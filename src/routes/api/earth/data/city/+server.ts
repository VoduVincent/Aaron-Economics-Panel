import { json } from 'stream/consumers';
import type { RequestHandler } from '../$types';

import { EARTH_URL } from '$env/static/private';


import Database from 'better-sqlite3';
import { type } from 'os';

export const GET: RequestHandler = async ({ url }) => {

    const year = Number((url.searchParams.get('year')));
    let nation = (url.searchParams.get('nation'))?.toString();

    const db = await new Database(EARTH_URL);
    db.pragma('journal_mode = WAL');
    db.pragma("busy_timeout = 50000");

    let response



    if (year == 0 && nation?.length === 0){
        response = await db.prepare(`SELECT * FROM city`).all()
    }

    if (year != 0 && nation?.length === 0){
        response = await db.prepare(`SELECT * FROM city WHERE year = ?`).all(year)
    }

    if (year != 0 && nation?.length !== 0){
        response = await db.prepare(`SELECT * FROM city WHERE year = ? and empire = ?`).all(year,nation)
    }
    if (year == 0 && nation?.length !== 0){
        response = await db.prepare(`SELECT * FROM city WHERE empire = ?`).all(nation)
    }



    return new Response(JSON.stringify(response))
}