import type { ChatMessageMap } from "../types/commonTypes";
import getAllMessages from "./getAllMessages";

export default async function toChatMessageMap(chat_ids: string[]): Promise<ChatMessageMap> {

    const entries = await Promise.all(
        chat_ids.map(async chat_id => {
            const results = await getAllMessages(chat_id);

            return [
                chat_id,
                results.ok
                    ? results.response.messages
                    : []
            ] as const;
        })
    );

    return Object.fromEntries(entries);
}