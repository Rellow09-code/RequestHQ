import dotenv from "dotenv";
dotenv.config();
import express from "express";
import pg from "pg";
import cors from 'cors'
import { logRequestSchema, signRequestSchema } from "./zodSchemas.ts";
import { z } from 'zod'
import { compareHashes, hashPassword } from "./hashPassword.ts";
import { StatusCodes } from "http-status-codes";
import multer from "multer"
import { uploadToCloud } from "./fileUpload.ts";

//setup multer for file uploads
const upload = multer({dest:'uploads/'})

//connecting to the database
const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

//creating the app
const app = express();
const PORT = 3000;

//use unused important variables
PORT; z;

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
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({'message':`Unexpected error: ${error}`})
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
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({'message':`Unexpected error: ${error}`})
    }
})

//services
app.post("/post", upload.single("picture"), async (req, res) => {
  try {
    const {id, title, body } = req.body;
    let imageUrl: string | null = null;

    if (req.file) {
      imageUrl = await uploadToCloud(
        req.file.path,
        `post_${Date.now()}_${id}`
      );
    }
    await pool.query(
        "INSERT INTO posts (user_id, title, body, picture) VALUES ($1, $2, $3, $4)",
        [id, title, body, `${imageUrl}`]
    );

    res.status(StatusCodes.OK).json({ message: 'Posted successfully', imageUrl });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `Upload failed because ${error}` });
  }
});

app.get('/posts',async (req, res)=>{
    try{
        console.log('Retrieving the posts')
        const posts = await pool.query(
            `
            SELECT
                posts.*,
                posts.picture,
                users.name,
                users.surname,
                users.middle_name
            FROM posts
            JOIN users
            ON posts.user_id = users.id
            ORDER BY posts.created_at DESC
            LIMIT 13;
            `
        )
        console.log(posts)
        res.status(StatusCodes.OK).json({message: 'Posts retrieved successfully', posts:posts.rows})
        console.log('successful')
    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `Posts retrieval failed because ${error}` });
    }
})

app.listen(PORT, () => {
    console.log(`Server listening on on http://localhost:${PORT}`);
});