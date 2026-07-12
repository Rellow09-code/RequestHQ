import ProfileUI from "../components/ProfileUI"
import PostCard from "../components/PostCard"
import Icons from "../components/Icons"
import styles from './Home.module.scss'
import { useEffect, useState } from "react"
import { useMoveInvalidAuth } from "../../../shared/hooks/moveInvalidAuth"
import getPosts from "../services/getPosts"
import type { Chat, PostsResponse } from "../types/commonTypes"
import Card from "../components/Card"
import type { User } from "../../../shared/types/apiTypes"
import Message from "../components/Message"
import getChats from "../services/getChats"
 
export default function Home(){    
    useMoveInvalidAuth()
    const user_str = localStorage.getItem("user");
    if (!user_str){return}
    const user: User = JSON.parse(user_str);

    let [page, setPage] = useState(0)
    const [posts, setPosts] = useState<PostsResponse[]>([]);
    const [chats, setChats] = useState<Chat[]>([]);
    useEffect(() => {
        async function loadPosts() {
            const results = await getPosts();

            if (results.ok && results.response?.posts) {
                setPosts(results.response.posts);
                return
            }
            console.log('Failed to load posts')
        }

        loadPosts();
    }, []);

    useEffect(()=>{
        async function loadChats(){
            const results = await getChats(user.id)

            if (results.ok && results.response?.chats) {
                setChats(results.response.chats);
                return
            }
            console.log('Failed to load chats')
        }
        loadChats()
    },[])
    return(
        <>
            <header id={styles.main_header}>
                <ProfileUI id={user.id} picture={user.picture} name={user.name} surname={user.surname} middle_name={user.middle_name}/>
                <Icons setPage={setPage}/>
            </header>
            
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
                    {chats.map(chat => (
                        <Message
                            key={chat.id}
                            chat={chat}
                        />
                    ))}
                </main>
            }
            {page==3 && 
                <main id={styles.posting_main}><PostCard/></main>
            }
        </>
    )
}