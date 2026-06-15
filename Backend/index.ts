import dotenv from "dotenv";
dotenv.config();
import express from "express";
import pg from "pg";
import cors from 'cors'
import type { SignRequestType } from "./types.ts";
import { logRequestSchema, signRequestSchema } from "./zodSchemas.ts";
import { z } from 'zod'
import { compareHashes, hashPassword } from "./hashPassword.ts";
import { userInfo } from "node:os";
import { generateAccessToken } from "./generateTokens.ts";
import { StatusCodes } from "http-status-codes";
import { compare } from "bcrypt";

//connecting to the database
const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

//creating the app
const app = express();
const PORT = 3000;

//Allowing cross origin server request and json
app.use(cors({
    origin:'http://localhost:5173',
}))
app.use(express.json())

//Defining paths
app.get("/", (req, res) => {
    return res.status(StatusCodes.OK).json({message:"Server is running!"});
});

//Auth
app.post("/signIn",async (req,res)=>{
    try{
        console.log('trying to sign in a user')
        //Verify the schema
        const results = signRequestSchema.safeParse(req.body)
        if (!results.success){
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
            return res.status(StatusCodes.CONFLICT).json({'message':'bad input', 'error': 'User already exists, please log in instead'})
        }

        //Hash the users password
        const hashed_password = await hashPassword(password)

        //Send the information to the database
        const query_results = await pool.query(
            `
            INSERT INTO USERS (name, surname, middle_name, birth_date, email, phone_number, location, password)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            `,
            [name, surname, middle_name, birth_date, email, phone, location, hashed_password]
        )
        //Send respond back to the user
        console.log('completed signing in the user')
        return res.status(StatusCodes.OK).json({ message: "Profile created successfully" })
    }
    catch(error){
        console.log(`Failed to sign in user because ${error}`)
        return res.status(StatusCodes.UNAUTHORIZED).json({'error':`Please re-check your information because: ${error}`})
    }
})

app.post("/logIn",async (req,res)=>{
    try{
        console.log('trying to log in a user')
        //Verify the schema
        const results = logRequestSchema.safeParse(req.body)
        if (!results.success){
            return res.status(StatusCodes.UNAUTHORIZED).json({'message':'bad input', 'error': results.error.flatten()})
        }
        //Extract the users data
        const {email, password} = results.data

        //Check if user exists
        const user_exist = await pool.query(
            `
            SELECT * FROM USERS WHERE email = $1
            `,
            [email]
        )
        if (user_exist.rows.length === 0){
            return res.status(StatusCodes.CONFLICT).json({'message':'bad input', 'error': 'User does not exist, please sign in'})
        }

        //check the user's password
        const hashed_password = user_exist.rows[0].password
        compareHashes(password, hashed_password).then((results)=>{
            if (!results){
                return res.status(StatusCodes.UNAUTHORIZED).json({'error':`Incorrect email or password`})
            }
            //Send respond back to the user
            console.log('completed logging in the user')
            return res.status(StatusCodes.OK).json({ message: "Profile retreived successfully", user_info:user_exist.rows[0] })
        })
        
    }
    catch(error){
        console.log(`Failed to log in user because ${error}`)
        return res.status(StatusCodes.UNAUTHORIZED).json({'error':`Please re-check your information because: ${error}`})
    }
})

app.post("/post",async (req,res)=>{
    try{
        let {user_id, title, body, picture} = req.body

        if (!user_id){
            return res.status(401).json({'message':`Please re-check your information`})
        }

        const values:Array<string> = [
            user_id,
            title,
            body,
            picture
        ]

        for (const value of values){
            console.log(value)
        }
        await pool.query(
            `
            INSERT INTO POSTS (user_id,title,body,picture)
            VALUES ($1, $2, $3, $4)
            `,
            values
        )
    }catch(error){
        return res.status(401).json({'message':`Please re-check your information because: ${error}`})
    }
})

app.listen(PORT, () => {
    console.log(`Server listening on on http://localhost:${PORT}`);
});