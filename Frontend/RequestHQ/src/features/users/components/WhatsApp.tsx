import styles from'./Card.module.scss'
import { useState } from "react"
import getWhatsappUrl from '../services/getWhatsappUrl';

export default function WhatsappCard(){
    let [post_card, setPostCard] = useState<string>('Hi, I am interested in your request from requestHQ');
    const [feedback, setFeedback] = useState<string>('')
    async function post(){
        if (!post_card){
            setFeedback('Invalid post body')
            return
        }
        setFeedback('')
        const results = getWhatsappUrl('',post_card)
        setFeedback(results)
    }

    return (
        <div className={styles.card}>
            <section className={styles.card_body}>
                <textarea value={post_card} onChange={(e)=>setPostCard(e.target.value)} id={styles.post_text} placeholder="text"></textarea>
            </section>
            <section className={styles.edit_card_buttons}>
                <button id={styles.cancel_post}>Cancel</button>
                <button onClick={post} id={styles.post}>Send</button>
            </section>
            <h4 className={styles.feedback}>{feedback}</h4>
        </div>
    )
}