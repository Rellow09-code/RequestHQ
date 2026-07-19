import dotenv from "dotenv";
dotenv.config()
import { infoUpdateRequestSchema } from "../zodSchemas.ts";
import { StatusCodes } from "http-status-codes";
import pool from "../database/database.ts";
import type { Request, Response } from "express";

export default async function infoUpdate(req:Request,res:Response){
    try{
        console.log('trying to update a user')
        //Verify the schema
        const results = infoUpdateRequestSchema.safeParse(req.body)
        if (!results.success){
            console.log('error: ', results.error.flatten())
            return res.status(StatusCodes.UNAUTHORIZED).json({'message':'bad input', 'error': results.error.flatten()})
        }
        //Extract the users data
        const {user_info, contact_info, password, id} = results.data
        const {name, surname, middle_name, birth_date} = user_info
        const {email, phone, street, city, province, country} = contact_info
        const location = `${street}, ${city}, ${province}, ${country}`

        //Check if user exists
        const user_exist = await pool.query(
            `
            SELECT 1 FROM USERS WHERE email = $1
            `,
            [email]
        )
        if (user_exist.rows.length == 0){
            console.log('Unknown user, try signing in again')
            return res.status(StatusCodes.UNAUTHORIZED).json({'message':'bad input', 'error': 'Unknown user, try signing in again'})
        }

        //Send the information to the database
        const query_results = await pool.query(
            `
            UPDATE users
            SET
                name = $1,
                surname = $2,
                middle_name = $3,
                birth_date = $4,
                email = $5,
                phone_number = $6,
                location = $7
            WHERE id = $8
            RETURNING
                id,
                name,
                surname,
                middle_name,
                picture,
                birth_date,
                email,
                phone_number,
                location;
            `,
            [name, surname, middle_name, birth_date, email, phone, location, id]
        );
        //Send respond back to the user
        console.log('completed updating the user')
        return res.status(StatusCodes.OK).json({ message: "completed updating the user", user_info:query_results.rows[0] })
    }
    catch(error){
        console.log(`Failed to update user because ${error}`)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({'message':`Unexpected error: ${error}`})
    }
}