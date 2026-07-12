import dotenv from "dotenv";
dotenv.config()
import { compareHashes } from "../tools/hashPassword.ts";
import { StatusCodes } from "http-status-codes";
import pool from "../database/database.ts";
import type { Request, Response } from "express";
import { logRequestSchema } from "../zodSchemas.ts";

export default async function logIn(req:Request,res:Response){
    try{
        console.log('trying to log in a user')
        //Verify the schema
        const results = logRequestSchema.safeParse(req.body)
        if (!results.success){
            console.log('error: ',results.error.flatten())
            return res.status(StatusCodes.UNAUTHORIZED).json({'message':'bad input', 'error': results.error.flatten()})
        }
        //Extract the users data
        const {email, password} = results.data

        //Check if user exists
        const user_exist = await pool.query(
            `
            SELECT id, name, surname, middle_name, birth_date, email, phone_number, location, password FROM USERS WHERE email = $1
            `,
            [email]
        )
        if (user_exist.rows.length === 0){
            console.log('User does not exist, please sign in')
            return res.status(StatusCodes.CONFLICT).json({'message':'bad input', 'error': 'User does not exist, please sign in'})
        }
        
        //check the user's password
        const hashed_password = user_exist.rows[0].password
        const correct_password = await compareHashes(password, hashed_password)
        if (!correct_password){
            console.log('Incorrect email or password')
            return res.status(StatusCodes.UNAUTHORIZED).json({'error':`Incorrect email or password`})
        }
        //Send respond back to the user
        console.log('completed logging in the user')
        return res.status(StatusCodes.OK).json({ message: "Profile retreived successfully", user_info:user_exist.rows[0] })

        
    }
    catch(error){
        console.log(`Failed to log in user because ${error}`)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({'message':`Unexpected error: ${error}`})
    }
}