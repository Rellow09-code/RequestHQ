import styles from './Icons.module.scss'

export default function Icons(){
    return(
        <section id={styles.main_header_buttons}>
            <i className="material-icons" id={styles.home}>home</i>
            <i className="material-icons" id={styles.notifications}>notifications</i>
            <i className="material-icons" id={styles.message}>message</i>
            <i className="material-icons" id={styles.post_add}>post_add</i>
            <i className="material-icons" id={styles.density_medium}>density_medium</i>
            <i className="material-icons" id={styles.refresh}>refresh</i>
        </section>
    )
}