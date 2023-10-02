import { json } from 'stream/consumers';
import type { RequestHandler } from '../$types';


import Database from 'better-sqlite3';

export const GET: RequestHandler = async ({ url }) => {

    const year = Number((url.searchParams.get('year')));
    const month = Number((url.searchParams.get('month')));

    const db = await new Database("D:/Aaron-Economics-Panel/data/earth.db");
    db.pragma('journal_mode = WAL');
    db.pragma("busy_timeout = 50000");

    let response

    if (year == 1) {
        response = await db.prepare(`SELECT * FROM city`).all()
    }

    else{
        response = await db.prepare(`SELECT * FROM city WHERE month = ? and year = ?`).all(month,year)
    }
    
    return new Response(JSON.stringify(response))
}