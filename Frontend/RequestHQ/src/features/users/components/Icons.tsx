import { useNavigate } from 'react-router-dom'
import styles from './Icons.module.scss'
import type { setStateProp } from '../../auth/types/props'

export default function Icons({setPage}:setStateProp){
    const navigate = useNavigate()
    return(
        <section id={styles.main_header_buttons}>
            <i className="material-icons" onClick={()=>setPage(0)} id={styles.home}>home</i>
            <i className="material-icons" onClick={()=>setPage(1)} id={styles.notifications}>notifications</i>
            <i className="material-icons" onClick={()=>setPage(2)} id={styles.message}>message</i>
            <i className="material-icons" onClick={()=>setPage(3)} id={styles.post_add}>post_add</i>
            <i className="material-icons" onClick={()=>setPage(4)} id={styles.density_medium}>density_medium</i>
            <i className="material-icons" onClick={()=>navigate('/Home')} id={styles.refresh}>refresh</i>
        </section>
    )
}