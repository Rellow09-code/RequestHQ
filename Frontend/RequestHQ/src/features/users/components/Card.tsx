import ProfileUI from "./ProfileUI"
import styles from './Card.module.scss'
import type { postResponseProp } from "../types/commonTypes"

export default function({post}: postResponseProp){
    if (!post){
        return <></>
    }
    return (
        <div className={styles.card}>
            <section className={styles.card_header}>
                <ProfileUI/>
                <h1>{post.title}</h1> 
            </section>
            <section className={styles.card_body}>
                <p>{post.body}</p>
                {post.picture && <img src={post.picture}/>}
            </section>
            <section className={styles.card_buttons}>
                <i className='material-icons' id={styles.add_icon}>add</i>
                <i className='material-icons' id={styles.message_icon}>messages</i>
            </section>
        </div>
    )
}