import pool from "../database/database.ts";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

async function searchName(req:Request,res:Response){
    console.log('checking req query parameters')
    const name:string = `${req.query.name}`
    if (!name){
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({error:'Request query parameters not sent'})
    }

    try{
        console.log(`Searching for users`)
        const results = await pool.query(
            `
            SELECT
                id,
                name,
                surname,
                middle_name,
                picture
            FROM users
            WHERE CONCAT_WS(' ', name, middle_name, surname)
                ILIKE '%' || $1 || '%';
            `,
            [name]
        );
        console.log(`Success`)
        return res.status(StatusCodes.OK).json({ message: 'Sucess', users:results.rows });
    }
    catch(error){
        console.log(`failed:${error}`)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `Couldn't get users because: ${error}` });
    }
}

export {searchName}