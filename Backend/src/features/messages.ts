import pool from "../database/database.ts";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
/**
 * Sends a message to a user from a user
 * expected request body : {
 *      id: UUID,
 *      receiver_id: UUID,
 *      Message: UUID
 * }
 */
async function getRecentMessages(req:Request,res:Response){
    console.log('checking req query parameters')
    const chat_id:string = `${req.query.chat_id}`
    const from_at:string = `${req.query.from_at}`
    if (!chat_id || !from_at){
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({error:'Request query parameters not sent'})
    }

    try{
        console.log(`sending the message`)
        const results = await pool.query(
            `
            SELECT
                m.id,
                m.chat_id,
                m.user_id,
                m.body,
                m.created_at,
                m.updated_at,
                u.name,
                u.surname,
                u.middle_name,
                u.picture
            FROM messages m
            JOIN users u
                ON u.id = m.user_id
            WHERE m.chat_id = $1
            AND m.created_at > $2
            ORDER BY m.created_at ASC;
            `,
            [chat_id, from_at]
        );
        console.log(`Success`)
        return res.status(StatusCodes.OK).json({ message: 'Sucess', messages:results.rows });
    }
    catch(error){
        console.log(`failed:${error}`)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `Couldn't get messages because: ${error}` });
    }
}

async function getAllMessages(req:Request,res:Response){
    console.log('checking req query parameters')
    const chat_id:string = `${req.query.chat_id}`
    if (!chat_id){
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({error:'Request query parameters not sent'})
    }

    try{
        console.log(`sending the message`)
        const results = await pool.query(
            `
            SELECT
                m.id,
                m.chat_id,
                m.user_id,
                m.body,
                m.created_at,
                m.updated_at,
                u.name,
                u.surname,
                u.middle_name,
                u.picture
            FROM messages m
            JOIN users u
                ON m.user_id = u.id
            WHERE m.chat_id = $1
            ORDER BY m.created_at ASC;
            `,
            [chat_id]
        );
        console.log(`Success`)
        return res.status(StatusCodes.OK).json({ message: 'Sucess', messages:results.rows });
    }
    catch(error){
        console.log(`failed:${error}`)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `Couldn't get messages because: ${error}` });
    }
}

async function getPrivateChats(req:Request,res:Response){
    console.log('checking req query parameters')
    const id:string = `${req.query.id}`
    if (!id){
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({error:'Request query parameters not sent'})
    }

    try{
        console.log(`sending the message`)
        const results = await pool.query(
            `
            with 
            user_chats as (
                --A table of private chats involving the user
                SELECT cp.chat_id from chat_participants cp INNER JOIN chats c
                on cp.chat_id = c.id
                where c.is_group = FALSE and cp.user_id = $1
            ),
            receivers_involved as (
                -- A table of other users involved in users_chats
                select uc.chat_id, cp.user_id from user_chats uc INNER join chat_participants cp
                on uc.chat_id = cp.chat_id
                where cp.user_id <> $1
            ),
            final_output as (
                select * from receivers_involved ri INNER join users u
                on ri.user_id =u.id
            )
            select o.chat_id as id, o.user_id, o.name, o.surname, o.middle_name, o.picture from final_output o
            `,
            [id]
        );
        console.log(`Success`)
        return res.status(StatusCodes.OK).json({ message: 'Sucess', chats:results.rows });
    }
    catch(error){
        console.log(`failed:${error}`)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `Couldn't get chats because: ${error}` });
    }
}
async function sendMessage(req:Request,res:Response){
    console.log('checking req body for sending messages')
    if (!req.body){
        console.log('Request body not sent')
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({error:'Request body not sent'})
    }
    const {id, receiver_id, message} = req.body
    if (!id || !receiver_id){
        console.log('Unknown user')
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({error:'Unknown user'})
    }
    if (!message){
        console.log('Can not send an empty message')
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({error:'Can not send an empty message'})
    }

    try{
        console.log(`sending the message`)
        const results = await pool.query(
            `
            WITH
            chat_exists as (
                SELECT cp.chat_id as id
                FROM chat_participants cp
                JOIN chats c
                    ON c.id = cp.chat_id
                WHERE cp.user_id IN ($1,$2)
                    AND c.is_group = FALSE
                GROUP BY cp.chat_id
                HAVING COUNT(*) = 2
            ),
            new_chat as (
                INSERT INTO chats (is_group)
                SELECT FALSE WHERE NOT EXISTS (select 1 from chat_exists)
                RETURNING id
            ),
            chosen_chat as (
                select id from chat_exists UNION ALL select id from new_chat
            ),
            try_adding_participants as(
                INSERT INTO chat_participants (chat_id, user_id)
                SELECT chosen_chat.id, $1 from chosen_chat
                    where EXISTS(
                    SELECT 1 from new_chat
                    )
            
                UNION ALL
            
                SELECT chosen_chat.id, $2 from chosen_chat
                    where EXISTS(
                    SELECT 1 from new_chat
                    )
                RETURNING *
            )
            INSERT INTO messages (user_id, chat_id, body)
                SELECT $1, chosen_chat.id, $3 from chosen_chat
            RETURNING *

            `,
            [id,receiver_id, message]
        );
        console.log(`sent`)
        return res.status(StatusCodes.OK).json({ message: 'Message sent', results:results.rows[0] });
    }
    catch(error){
        console.log(`failed:${error}`)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `Couldn't send message because: ${error}` });
    }
}


export {sendMessage, getPrivateChats, getAllMessages, getRecentMessages}