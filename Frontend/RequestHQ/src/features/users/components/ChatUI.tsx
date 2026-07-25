import { useEffect, useRef, useState } from "react";
import type { User } from "../../../shared/types/apiTypes";
import type { ChatProp, Message } from "../types/commonTypes";
import MessageUI from "./MessageUI";
import ProfileUI from "./ProfileUI";
import styles from './ChatUI.module.scss'
import sendMessage from "../services/sendMessage";
import type { ChatMessageMap } from "../types/commonTypes";

export default function ChatUI({chat, chat_message_map, setChatMessageMap}:ChatProp){
    const [message, setMessage] = useState<string>('')
    const [sending, setSending] = useState<boolean>(false)
    const user:User = JSON.parse(localStorage.getItem('user') || '{}')
    if (!user.id){alert('Failed to assess user information, try login in again'); return null}
    const chatMessagesRef= useRef<HTMLElement|null>(null)
    async function sendChatMessage() {
        setSending(true)
        await doSendChatMessage()
        setSending(false)
    }

    async function doSendChatMessage(){
        if (!chat){return alert('unknown chat')}
        const results = await sendMessage(chat.user_id,message)
        if (!results.ok){alert('Something went wrong, from the response'); return null}
        console.log('Successfully sent')

        const message_res = results.response.results
        message_res['name'] = user.name
        message_res['surname'] = user.surname
        message_res['middlename'] = user.middle_name
        message_res['picture'] = user.picture
        const proper_message:Message = message_res
        setChatMessageMap((old_obj:ChatMessageMap)=>{
            return {...old_obj, [proper_message.chat_id] : [...old_obj[proper_message.chat_id]??[],proper_message]}
        })
        setMessage('') 
    }

    function formatTime(db_time:string):string{
        const formatted = new Date(db_time)
            .toLocaleString([], {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        return formatted
    }

    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop =
                chatMessagesRef.current.scrollHeight;
        }
    }, [chat, chat_message_map]);
    if (!chat){
        return (
            <div className={styles.intro_text}>
                <h3>Click on a friend to show your conversation with them</h3>
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
                <section className={styles.chat_messages} ref={chatMessagesRef}>
                    {
                        chat_message_map?.[chat.id]?.map(message => {
                            return (
                                <div key={message.id}>
                                    <MessageUI body={message.body} time={formatTime(message.updated_at)} mine={message.user_id == user.id}/>
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
                        onKeyDown={e=>{if (e.key == 'Enter'){sendChatMessage()}}}
                    />

                    <button onClick={sendChatMessage} disabled={sending || (message.trim()=='')}>
                        {sending?'...':'send'}
                    </button>
                </section>
            </div>
            )
    }
}