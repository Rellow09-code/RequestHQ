import dotenv from "dotenv";
dotenv.config()
import { StatusCodes } from "http-status-codes";
import pool from "../database/database.ts";
import type { Request, Response } from "express";
import { uploadToCloud } from "../tools/fileUpload.ts";

async function post(req:Request,res:Response){
  try {
    const {id, title, body } = req.body;
    if (!id) {return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error: 'unknown user' })}
    
    let imageUrl: string | null = null;
    if (req.file) {
      imageUrl = await uploadToCloud(
        req.file.path,
        `post_${Date.now()}_${id}`
      );
    }
    if (!body && !imageUrl) {return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error: 'Cannot post empty content' })}
    
    await pool.query(
        "INSERT INTO posts (user_id, title, body, picture) VALUES ($1, $2, $3, $4)",
        [id, title, body, `${imageUrl}`]
    );

    console.log('Posted successfully')
    return res.status(StatusCodes.OK).json({ message: 'Posted successfully', imageUrl });
  } catch (error) {
    console.error('error: ',error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `Upload failed because ${error}` });
  }
}

async function getPosts(req:Request,res:Response){
    try{
        console.log('Retrieving the posts')
        const posts = await pool.query(
            `
            SELECT
                posts.*,
                posts.picture as post_picture,
                users.picture,
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
        console.log('successful')
        return res.status(StatusCodes.OK).json({message: 'Posts retrieved successfully', posts:posts.rows})
    }catch(error){
        console.log(`Failed to get post because ${error}`)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `Posts retrieval failed because ${error}` });
    }
}

export {post, getPosts}