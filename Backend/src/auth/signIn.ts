import dotenv from "dotenv";
dotenv.config()
import { signRequestSchema } from "../zodSchemas.ts";
import { hashPassword } from "../tools/hashPassword.ts";
import { StatusCodes } from "http-status-codes";
import pool from "../database/database.ts";
import type { Request, Response } from "express";

export default async function signIn(req:Request,res:Response){
    try{
        console.log('trying to sign in a user')
        //Verify the schema
        const results = signRequestSchema.safeParse(req.body)
        if (!results.success){
            console.log('error: ', results.error.flatten())
            return res.status(StatusCodes.UNAUTHORIZED).json({'message':'bad input', 'error': results.error.flatten()})
        }
        //Extract the users data
        const {user_info, contact_info, password} = results.data
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
        if (user_exist.rows.length > 0){
            console.log('User already signed up, please log in instead')
            return res.status(StatusCodes.CONFLICT).json({'message':'bad input', 'error': 'User already signed up, please log in instead'})
        }

        //Hash the users password
        const hashed_password = await hashPassword(password)

        //Send the information to the database
        const query_results = await pool.query(
            `
            INSERT INTO USERS (name, surname, middle_name, birth_date, email, phone_number, location, password)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id, name, surname, middle_name, picture, birth_date, email, phone_number, location;
            `,
            [name, surname, middle_name, birth_date, email, phone, location, hashed_password]
        )
        //Send respond back to the user
        console.log('completed signing in the user')
        return res.status(StatusCodes.OK).json({ message: "Profile created successfully", user_info:query_results.rows[0] })
    }
    catch(error){
        console.log(`Failed to sign in user because ${error}`)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({'message':`Unexpected error: ${error}`})
    }
}