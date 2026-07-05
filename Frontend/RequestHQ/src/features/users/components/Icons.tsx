import styles from './Icons.module.scss'
import type { setStateProp } from '../../auth/types/props'

export default function Icons({setPage}:setStateProp){
    const block = null
    return(
        <section id={styles.main_header_buttons}>
            <section className={styles.card_buttons}>
                <div className={styles.actions}>
                    <i className={`material-icons ${styles.icon}`} onClick={()=>setPage(0)}>home</i>
                    {block && <i className={`material-icons ${styles.icon}`} onClick={()=>setPage(1)}>notifications</i>}
                    <i className={`material-icons ${styles.icon}`} onClick={()=>setPage(2)}>message</i>
                    <i className={`material-icons ${styles.icon}`} onClick={()=>setPage(3)}>post_add</i>
                    {block && <i className={`material-icons ${styles.icon}`} onClick={()=>setPage(4)}>density_medium</i>}
                    <i className={`material-icons ${styles.icon}`} onClick={()=>window.location.reload()}>refresh</i>
                </div>
            </section>
        </section>
    )
}