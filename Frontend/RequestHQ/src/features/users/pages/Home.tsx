import ProfileUI from "../components/ProfileUI"
import PostCard from "../components/PostCard"
import Icons from "../components/Icons"
import styles from './Home.module.scss'
import { useEffect, useState } from "react"
import { useMoveInvalidAuth } from "../../../shared/hooks/moveInvalidAuth"
import getPosts from "../services/getPosts"
import type { ChatMessageMap, Chat, PostsResponse } from "../types/commonTypes"
import Card from "../components/Card"
import type { User } from "../../../shared/types/apiTypes"
import getChats from "../services/getChats"
import ChatUI from "../components/ChatUI"
import Search from "../components/Search"
import Loading from "../../../shared/components/Loading"
import toChatMessageMap from "../services/toChatMessageMap"


export default function Home(){    
    useMoveInvalidAuth()
    const user_str = localStorage.getItem("user");
    if (!user_str){return}
    const user: User = JSON.parse(user_str);
    const [current_chat, setCurrentChat] = useState<Chat|null>(null)
    const [load,setLoad] = useState<boolean>(false) 

    let [page, setPage] = useState(0)
    const [posts, setPosts] = useState<PostsResponse[]>([]);
    const [chats, setChats] = useState<Chat[]>([]);
    const [chat_message_dict, setChatMessageDict] = useState<ChatMessageMap>({})

    useEffect(() => {
        async function loadPosts() {
            const results = await getPosts();

            if (results.ok && results.response?.posts) {
                setPosts(results.response.posts);
                return
            }
            console.log('Failed to load posts')
        }
        async function loadChats(){
            const results = await getChats(user.id)

            if (results.ok && results.response?.chats) {
                const chat_list:Chat[] = results.response.chats
                const chat_ids:string[] = chat_list.map((chat:Chat)=>chat.id)
                setChats(chat_list);
                const new_chat_message_dict = await toChatMessageMap(chat_ids)
                setChatMessageDict(new_chat_message_dict)
                return
            }
            console.log('Failed to load chats')
        }
        async function initiate(){
            setLoad(true)
            await loadPosts();
            await loadChats()
            setLoad(false)
        }
        initiate()
    },[])
    return(
        <>
            <header id={styles.main_header}>
                <ProfileUI id={user.id} picture={user.picture} name={user.name} surname={user.surname} middle_name={user.middle_name}/>
                <Icons setPage={setPage}/>
            </header>
            <Loading show={load} />
            {page==0 && 
                <main id={styles.home_main}>
                    {posts.map(post => (
                        <Card
                            key={post.id}
                            post={post}
                        />
                    ))}
                </main>
            }
            {page==2 && 
                <main id={styles.message_main}>
                    <section id={styles.chats}>
                        {chats.map(chat => (
                            <div key={chat.user_id} onClick={()=>setCurrentChat(chat)}>
                                <ProfileUI
                                    id={ chat.user_id}
                                    picture={ chat.picture}
                                    name={`${chat.name}`}
                                    surname={`${chat.surname}`}
                                    middle_name={ `${chat.middle_name}`}
                                />
                            </div>
                    ))}
                    </section>
                    <section id={styles.chat_ui}>
                        <ChatUI chat={current_chat} chat_message_map={chat_message_dict}></ChatUI>
                    </section>
                </main>
            }
            {page==3 && 
                <main id={styles.posting_main}><PostCard/></main>
            }
            {page==5 && 
                <main id={styles.home_main}><Search/></main>
            }
        </>
    )
}