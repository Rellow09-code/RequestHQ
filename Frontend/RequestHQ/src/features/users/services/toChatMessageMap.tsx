import type { ChatMessageMap } from "../types/commonTypes";
import getAllMessages from "./getAllMessages";

export default async function toChatMessageMap(chat_ids:string[]) {
    const chatToMessageDict:ChatMessageMap = {}
    chat_ids.forEach(async chat_id => {
        try{
            const results = await getAllMessages(chat_id)
            if (!results.ok){
                console.log(`Failed to get chats for ${chat_id}`)
            }
            console.log('success')
            chatToMessageDict[chat_id] = results.response.messages
        }
        catch (e){
            console.log(`Failed to get chats: ${e}`)
        }
    });
    return chatToMessageDict
}