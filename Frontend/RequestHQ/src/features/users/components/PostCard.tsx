import styles from'./Card.module.scss'
import { useState } from "react"
import type { PostCard } from "../types/commonTypes"
import postCard from "../services/postCard"
import type { SetStateProp } from '../../auth/types/props'
import Loading from '../../../shared/components/Loading'

export default function PostCard({setPage}:SetStateProp){
    const [post_card, setPostCard] = useState<PostCard>({title:'', body:'',picture:null})
    const [feedback, setFeedback] = useState<string>('')
    const [posting, setPosting] = useState<boolean>(false)

    async function post(){
        setPosting(true)
        await doPost()
        setPosting(false)
        window.location.reload()
    }
    async function doPost(){
        if (!post_card.body){
            setFeedback('Invalid post body')
            return
        }
        setFeedback('')
        const results = await postCard(post_card)
        if (!results.ok){
            setFeedback(`Failed to post because: ${results.error}`)
            return
        }
        setFeedback(``)
    }

    function updatePostCard(key:string, value:any){
        setPostCard((old_obj:PostCard) =>{
            return {...old_obj, [key]:value}
        })
    }

    return (
        <div className={styles.card}>
            <Loading show={posting}/>
            <section className={styles.card_header}>
                <h3><input value={post_card.title} onChange={(e)=>updatePostCard('title',e.target.value)} id={styles.post_title} type="text" placeholder="Title"/></h3>
            </section>
            <section className={styles.card_body}>
                <textarea value={post_card.body} onChange={(e)=>updatePostCard('body',e.target.value)} id={styles.post_text} placeholder="text"></textarea>
                <div className={styles.image_upload}>
                    <label>Upload a picture</label>
                    <input onChange={(e)=>updatePostCard('picture',e.target.files?.[0])} id={styles.post_picture} type="file" accept="image/*"/>
                </div>
            </section>
            <section className={styles.edit_card_buttons}>
                <button id={styles.cancel_post} onClick={()=>setPage(0)}>Cancel</button>
                <button onClick={post} id={styles.post}>Post</button>
            </section>
            <h4 className={styles.feedback}>{feedback}</h4>
        </div>
    )
}