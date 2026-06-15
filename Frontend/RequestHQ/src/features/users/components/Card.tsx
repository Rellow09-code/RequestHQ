import ProfileUI from "./ProfileUI"
import styles from './Card.module.scss'

export default function(){
    return (
        <div className={styles.card}>
            <section className={styles.card_header}>
                <ProfileUI/>
                <h1></h1> 
            </section>
            <section className={styles.card_body}>
                <p>Hellow everyone I am Huli <br />I hope that everyone is having a good day</p>
                <img src="https://s3-alpha.figma.com/hub/file/1389663148/a258a7be-7239-4762-920d-67f7f3f6446e-cover.png"/>
            </section>
            <section className={styles.card_buttons}>
                <i className='material-icons' id={styles.add_icon}>add</i>
                <i className='material-icons' id={styles.message_icon}>messages</i>
            </section>
        </div>
    )
}