import ProfileUI from "./ProfileUI"
import styles from'./Card.module.scss'

export default function PostCard(){
    return (
        <div className={styles.card}>
            <section className={styles.card_header}>
                <ProfileUI/>
                <h3><input id={styles.post_title} type="text" placeholder="Title"/></h3>
            </section>
            <section className={styles.card_body}>
                <textarea id={styles.post_text} placeholder="text"></textarea>
                <div className={styles.image_upload}>
                    <label>Upload a picture</label>
                    <input id={styles.post_picture} type="file" accept="image/*"/>
                </div>
            </section>
            <section className={styles.edit_card_buttons}>
                <button id={styles.cancel_post}>Cancel</button>
                <button id={styles.post}>Post</button>
            </section>
        </div>
    )
}