import { useState } from "react";
import ProfileUI from "./ProfileUI";
import type { MiniUser } from "../../../shared/types/commonTypes";
import searchName from "../services/searchName";
import Loading from "../../../shared/components/Loading";
import styles from './Search.module.scss'
import sendMessage from "../services/sendMessage";
import type { User } from "../../../shared/types/apiTypes";

export default function Search(){
    const [users, setUsers] = useState<MiniUser[]>([]);
    const [name, setName] = useState<string>('')
    const [load,setLoad] = useState<boolean>(false)
    async function searchUser() {
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

    async function sendChatMessage(receiver_id:string,message='Hi!'){
        const my_id:User = JSON.parse(localStorage.getItem('user') || '{}')
        if (!my_id.id){alert('Failed to assess user information, try login in again'); return null}
        
        const results = await sendMessage(my_id.id,receiver_id,message)
        if (!results.ok){alert('Something went wrong, from the response'); return null}
        console.log('Successfully sent')
    }
    return (
        <div className={styles.main_search}>
            <section className={styles.search_bar}>
                <input
                    type="text"
                    placeholder="Search people..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                            if (confirm(`Do you wish to start a coversation with ${user.name} ${user.surname}?`)){
                                sendChatMessage(user.id)
                            }
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
        </div>
    )
}