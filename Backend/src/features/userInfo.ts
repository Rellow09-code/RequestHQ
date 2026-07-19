import pool from "../database/database.ts"
import type { Request, Response } from "express";
import { uploadToCloud } from "../tools/fileUpload.ts";
import { StatusCodes } from "http-status-codes";

export async function setProfilePicture(req:Request,res:Response) {
    const id = req.query.id
    try{
        console.log('saving picture')
        let imageUrl: string | null = null;
        if (req.file) {
        imageUrl = await uploadToCloud(
            req.file.path,
            `post_${Date.now()}_${id}`
        );
        }
        
        const results = await pool.query(
            `
            UPDATE users
            SET picture = $1
            WHERE id = $2
            RETURNING picture;
            `,
            [imageUrl, id]
        );

        console.log('Uploaded successfully')
        console.log(results.rows)
        console.log(imageUrl)
        return res.status(StatusCodes.OK).json({ message: 'Uploaded successfully', imageUrl });
    } catch (error) {
        console.error('error: ',error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `Upload failed because ${error}` });
    }
}