import type { MiniUser } from '../../../shared/types/commonTypes'
import styles from './ProfileUI.module.scss'

export default function ProfileUI(user:MiniUser){
    return(
        <>
            <div className={styles.profile_UI}>
                <img src={user.picture || 'https://tse3.mm.bing.net/th/id/OIP.ukyBvqWlVM8RE5pSjQNchwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'} alt=""/>
                <p><b>{`${user.name} ${user.surname}`}</b></p>
            </div>
        </>
    )
}