import pool from "../database/database.ts";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

async function sendMessage(req:Request,res:Response){
    try{
        console.log(`sending the message`)
        const results = await pool.query(
            `
            WITH existing_chat AS (
                SELECT cp.chat_id
                FROM chat_participants cp
                JOIN chats c
                    ON c.id = cp.chat_id
                WHERE c.is_group = FALSE
                GROUP BY cp.chat_id
                HAVING
                    COUNT(*) = 2
                    AND COUNT(*) FILTER (WHERE cp.user_id = $1) = 1
                    AND COUNT(*) FILTER (WHERE cp.user_id = $2) = 1
                LIMIT 1
            ),
            new_chat AS (
                INSERT INTO chats (created_by, is_group)
                SELECT $1, FALSE
                WHERE NOT EXISTS (SELECT 1 FROM existing_chat)
                RETURNING id
            ),
            chat_to_use AS (
                SELECT chat_id AS id FROM existing_chat
                UNION ALL
                SELECT id FROM new_chat
            ),
            participants AS (
                INSERT INTO chat_participants (chat_id, user_id)
                SELECT id, $1
                FROM chat_to_use
                WHERE EXISTS (SELECT 1 FROM new_chat)

                UNION ALL

                SELECT id, $2
                FROM chat_to_use
                WHERE EXISTS (SELECT 1 FROM new_chat)
            )
            INSERT INTO messages (chat_id, sender_id, body)
            SELECT id, $1, $3
            FROM chat_to_use
            RETURNING chat_id;
            `,[req.body.id, req.body.receiver_id, req.body.message]
        );
        console.log(`sent`)
        console.log(results)
        return res.status(StatusCodes.OK).json({ message: 'Message sent' });
    }
    catch(error){
        console.log(`failed`)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `Couldn't send message because: ${error}` });
    }
}

export {sendMessage}