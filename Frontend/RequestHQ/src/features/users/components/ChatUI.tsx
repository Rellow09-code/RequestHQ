import { useState } from "react";
import type { User } from "../../../shared/types/apiTypes";
import type { ChatProp } from "../types/commonTypes";
import MessageUI from "./MessageUI";
import ProfileUI from "./ProfileUI";
import styles from './ChatUI.module.scss'
import sendMessage from "../services/sendMessage";

export default function ChatUI({chat, chat_message_map}:ChatProp){
    const [message, setMessage] = useState<string>('')
    const my_id:User = JSON.parse(localStorage.getItem('user') || '{}')
    if (!my_id.id){alert('Failed to assess user information, try login in again'); return null}

    async function sendChatMessage(){
        if (!chat){return alert('unknown chat')}
        const results = await sendMessage(my_id.id,chat.user_id,message)
        if (!results.ok){alert('Something went wrong, from the response'); return null}
        console.log('Successfully sent')
        setMessage('')
    }
    if (!chat){
        return (
            <div>
                <h3>Your chat will show here</h3>
            </div>
            )
    }
    else{
        return (
            <div className={styles.chat_main}>
                <ProfileUI
                    id={ chat.user_id}
                    picture={ chat.picture}
                    name={`${chat.name}`}
                    surname={`${chat.surname}`}
                    middle_name={ `${chat.middle_name}`}/>
                <section className={styles.chat_messages}>
                    {
                        chat_message_map?.[chat.id]?.map(message => {
                            return (
                                <div key={message.id}>
                                    <MessageUI body={message.body} time={message.updated_at} mine={message.user_id == my_id.id}/>
                                </div>
                            )
                        })
                    }
                </section>
                <section className={styles.input_bar}>
                    <input
                        type="text"
                        placeholder="type message here"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <button onClick={sendChatMessage}>
                        send
                    </button>
                </section>
            </div>
            )
    }
}