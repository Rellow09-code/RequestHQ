import type { ChatProp } from '../types/commonTypes'
import styles from './Message.module.scss'

export default function privateMessage({chat}:ChatProp){
    console.log(chat)
    return (
        <div className={styles.profile_UI}>
            <img src={chat.picture || 'https://tse3.mm.bing.net/th/id/OIP.ukyBvqWlVM8RE5pSjQNchwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'} alt=""/>
            <section>
                <h3><b>{`${chat.name}`}</b></h3>
                <h6>Hellow world</h6>
            </section>
        </div>
    )
}