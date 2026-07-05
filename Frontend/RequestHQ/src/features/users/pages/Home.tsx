import ProfileUI from "../components/ProfileUI"
import PostCard from "../components/PostCard"
import Icons from "../components/Icons"
import styles from './Home.module.scss'
import { useEffect, useState } from "react"
import { useMoveInvalidAuth } from "../../../shared/hooks/moveInvalidAuth"
import getPosts from "../services/getPosts"
import type { postsResponse } from "../types/commonTypes"
import Card from "../components/Card"
import type { userType } from "../../../shared/types/apiTypes"

export default function Home(){    
    useMoveInvalidAuth()
    const user_str = localStorage.getItem("user");
    if (!user_str){return}
    const user: userType = JSON.parse(user_str);

    let [page, setPage] = useState(0)
    const [posts, setPosts] = useState<postsResponse[]>([]);
    useEffect(() => {
        async function loadPosts() {
            const results = await getPosts();

            if (results.ok && results.response?.posts) {
                setPosts(results.response.posts);
            }
        }

        loadPosts();
    }, []);
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
            </main>}

            {page==3 && <main id={styles.posting_main}><PostCard/></main>}
        </>
    )
}