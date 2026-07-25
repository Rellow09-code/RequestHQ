import ProfileUI from "./ProfileUI"
import styles from './Card.module.scss'
import type { PostResponseProp } from "../types/commonTypes"
import MessageDialog from "./MessageDialog";
import { useState } from "react";
import Loading from "../../../shared/components/Loading";
import sendMessage from "../services/sendMessage";

export default function Card({post}: PostResponseProp){
    if (!post){
        return <></>
    }
    const [load,setLoad] = useState<boolean>(false)
    const [showMessageDialog, setShowMessageDialog] = useState(false);
    const [target_id, setTargetId] = useState<string>('')
    const {user_id, name, surname, middle_name, picture} = post

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
        <div className={styles.card}>
            <Loading show={load} />
            <section className={styles.card_header}>
                <div onClick={()=>{
                    setTargetId(post.user_id)
                    setShowMessageDialog(true)
                    }}>
                    <ProfileUI id={user_id} picture={picture} name={name} surname={surname} middle_name={middle_name}/>
                    </div>
                <h1>{post.title}</h1> 
            </section>
            <section className={styles.card_body}>
                <p>{post.body}</p>
                {(post.post_picture!='null' && post.post_picture) && <img className={styles.card_image} src={post.post_picture}/> }
            </section>
            <section className={styles.card_buttons}>
                <i className='material-icons' id={styles.message_icon} onClick={()=>{
                    setTargetId(post.user_id)
                    setShowMessageDialog(true)
                    }}>messages</i>
            </section>
            <MessageDialog
                show={showMessageDialog}
                onClose={()=>setShowMessageDialog(false)}
                onSend={(message)=>trySendMessage(target_id,message)}
            ></MessageDialog>
        </div>
    )
}