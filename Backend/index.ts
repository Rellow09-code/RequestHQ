import express from "express";
import pg from "pg";
import session from 'express-session';

//Defining basic interfaces
interface User {
    id:string,
    name:string,
    surname:string,
    picture:string
}

interface Card {
    user:User,
    title:string,
    description:string,
    picture:string
}

//Defining basic functions
function valid_word(value:string):Boolean{
    return /w+/.test(value)
}
function valid_number(value:string):Boolean{
    return /d+/.test(value)
}
function valid_word_with_numbers(value:string):Boolean{
    return /(w|d)+/.test(value)
}
function valid_link(value:string):Boolean{
    return /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/.test(value)
}
//creating the database
const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

//Defining paths
const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.post("/post",(req,res)=>{
    let {user_id, title, body, picture} = req.body

    if (!valid_number(user_id)){}

    const values:Array<string> = [
        user_id,
        title,
        body,
        picture
    ]

    for (const value of values){
        
    }

    pool.query(
        `
        INSERT INTO POSTS (user_id,title,body,picture)
        VALUES ($1, $2, $3, $4)
        `,
        values
    )
})

app.listen(PORT, () => {
    console.log(`Server listening on on http://localhost:${PORT}`);
});

app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: true
}));