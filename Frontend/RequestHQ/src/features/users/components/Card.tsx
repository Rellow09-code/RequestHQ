import ProfileUI from "./ProfileUI"
import styles from './Card.module.scss'
import type { PostResponseProp } from "../types/commonTypes"

export default function Card({post}: PostResponseProp){
    if (!post){
        return <></>
    }
    const {user_id, name, surname, middle_name, picture} = post

    return (
        <div className={styles.card}>
            <section className={styles.card_header}>
                <ProfileUI id={user_id} picture={picture} name={name} surname={surname} middle_name={middle_name}/>
                <h1>{post.title}</h1> 
            </section>
            <section className={styles.card_body}>
                <p>{post.body}</p>
                {post.post_picture && <img src={post.post_picture}/>}
            </section>
            <section className={styles.card_buttons}>
                <i className='material-icons' id={styles.add_icon}>add</i>
                <i className='material-icons' id={styles.message_icon}>messages</i>
            </section>
        </div>
    )
}