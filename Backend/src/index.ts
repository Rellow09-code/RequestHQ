import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from 'cors'
import { z } from 'zod'
import { StatusCodes } from "http-status-codes";
import multer from "multer"
import signIn from "./auth/signIn.ts";
import logIn from "./auth/logIn.ts";
import { getPosts, post } from "./features/posts.ts";
import { getPrivateChats, sendMessage } from "./features/messages.ts";

//setup multer for file uploads
const upload = multer({dest:'uploads/'})

//creating the app
const app = express();
const PORT = 3000;

//use unused important variables
PORT; z;

//Allowing cross origin server request and json
const origin: string[] = ['https://request-hq.vercel.app'];
if (process.env.NODE_DEV){origin.push('http://localhost:5173')}

app.use(cors({
    origin,
}))
app.use(express.json())

//Defining paths
app.get("/", (req, res) => {
    console.log('Server is running!')
    return res.status(StatusCodes.OK).json({message:"Server is running!"});
});

//Auth
app.post("/signIn",signIn)
app.post("/logIn",logIn)

//services
app.post("/post", upload.single("picture"), post);
app.get('/posts',getPosts)

//Messaging functionality
app.post("/sendMessage",sendMessage)
app.get("/getPrivateChats", getPrivateChats)

if (process.env.Listen == 'TRUE'){
    app.listen(PORT, () => {
        console.log(`The server is running`);
    });
}
export default app