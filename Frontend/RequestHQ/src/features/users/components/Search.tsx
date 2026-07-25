import { useState } from "react";
import ProfileUI from "./ProfileUI";
import type { MiniUser } from "../../../shared/types/commonTypes";
import searchName from "../services/searchName";
import Loading from "../../../shared/components/Loading";
import styles from './Search.module.scss'
import sendMessage from "../services/sendMessage";
import MessageDialog from "./MessageDialog";

export default function Search(){
    const [users, setUsers] = useState<MiniUser[]>([]);
    const [name, setName] = useState<string>('')
    const [load,setLoad] = useState<boolean>(false)
    const [showMessageDialog, setShowMessageDialog] = useState(false);
    const [target_id, setTargetId] = useState<string>('')
    async function searchUser() {
        if (load){return}//prevent spam clicking
        setLoad(true)
        console.log('searching')
        const results = await searchName(name.trim())

        if (results.ok && results.response?.users) {
            setUsers(results.response.users);
            setLoad(false)
            return
        }
        console.log('Failed to load users')
        setLoad(false)
    }

    async function trySendMessage(target_id:string,message:string) {
        setLoad(true)
        const results = await sendMessage(target_id,message)
        if (!results.ok){
            alert('Failed to send the message, please try again later')
            console.log(results.error)
        }
        setLoad(false)
    }

    return (
        <div className={styles.main_search}>
            <section className={styles.search_bar}>
                <input
                    type="text"
                    placeholder="Search people..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={e=>{if (e.key=='Enter'){searchUser()}}}
                />

                <button onClick={searchUser}>
                    Search
                </button>
            </section>

            <Loading show={load} />

            <section className={styles.search_results}>
                {users.map(user => (
                    <div 
                        key={user.id}
                        onClick={()=>{
                            setTargetId(user.id)
                            setShowMessageDialog(true)
                        }}
                    >
                        <ProfileUI
                            id={user.id}
                            picture={user.picture}
                            name={user.name}
                            surname={user.surname}
                            middle_name={user.middle_name}
                        />
                    </div>
                ))}
            </section>
            <MessageDialog
                show={showMessageDialog}
                onClose={()=>setShowMessageDialog(false)}
                onSend={(message)=>trySendMessage(target_id,message)}
            ></MessageDialog>
        </div>
    )
}