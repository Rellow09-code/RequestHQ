import ProfileUI from "../components/ProfileUI"
import PostCard from "../components/PostCard"
import Icons from "../components/Icons"
import styles from './Home.module.scss'
import { useEffect, useState } from "react"
import { useMoveInvalidAuth } from "../../../shared/hooks/moveInvalidAuth"
import getPosts from "../services/getPosts"
import type { ChatMessageMap, Chat, PostsResponse, Message } from "../types/commonTypes"
import Card from "../components/Card"
import type { User } from "../../../shared/types/apiTypes"
import getChats from "../services/getChats"
import ChatUI from "../components/ChatUI"
import Search from "../components/Search"
import Loading from "../../../shared/components/Loading"
import toChatMessageMap from "../services/toChatMessageMap"
import SideMenu from "../components/SideMenu"
import PictureMenu from "../components/PictureMenu"


export default function Home(){    
    useMoveInvalidAuth()
    const user_str = localStorage.getItem("user");
    if (!user_str){return}
    const user: User = JSON.parse(user_str);
    localStorage.setItem('id',user.id)
    const [current_chat, setCurrentChat] = useState<Chat|null>(null)
    const [load,setLoad] = useState<boolean>(false) 
    const [menu, toogleMenu] = useState<boolean>(false)
    const [picture_menu, tooglePictureMenu] = useState<boolean>(false)
    let chat_list:Chat[] = [];


    let [page, setPage] = useState(0)
    const [posts, setPosts] = useState<PostsResponse[]>([]);
    const [chats, setChats] = useState<Chat[]>([]);

    const dummy_message:Message = {
            'id':'string',
            'chat_id':'string',
            'user_id':'string',
            'body':'string',
            'created_at':'string',
            'name':'string',
            'surname':'string',
            'middle_name':'string',
            'updated_at':'string',
            'picture':'string'
            }
    const [chat_message_dict, setChatMessageDict] = useState<ChatMessageMap>({
        '123' : [dummy_message]
    })

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
            chat_list = results.response.chats
            const chat_ids:string[] = chat_list.map((chat:Chat)=>chat.id)
            setChats(chat_list);
            const new_chat_message_dict = await toChatMessageMap(chat_ids)
            localStorage.setItem('chat_messages',JSON.stringify(new_chat_message_dict))
            return new_chat_message_dict
        }
        console.log('Failed to load chats')
    }
    
    useEffect(() => {
        async function refreshChats() {
            console.log("Chat refresh");

            const newChats = await loadChats();
            if (!newChats) return;

            setChatMessageDict(newChats);
        }

        async function poll() {
            while (false) {
                await refreshChats();
                setCurrentChat(oldChat => {
                    if (!oldChat) return null;

                    return chat_list.find(c => c.id === oldChat.id) ?? null;
                })
                await new Promise(resolve => setTimeout(resolve, 10000));
            }
        }

        poll();
    }, []);

    useEffect(() => {
        async function initiate(){
            setLoad(true)
            await loadPosts();
            let new_chats = await loadChats()
            if (new_chats){setChatMessageDict(new_chats)}
            setLoad(false)
        }
        initiate()
    },[])
    return(
        <section id={styles.main}>
            <header id={styles.main_header} onClick={()=>toogleMenu(!menu)}>
                <ProfileUI id={user.id} picture={user.picture} name={user.name} surname={user.surname} middle_name={user.middle_name}/>
                <Icons setPage={setPage}/>
            </header>
            <Loading show={load} />

            <PictureMenu show={picture_menu} tooglePictureMenu={tooglePictureMenu}/>
            <div className={styles.pages}>
                <SideMenu 
                    show = {menu}
                    toogleMenu={toogleMenu} 
                    tooglePictureMenu={tooglePictureMenu} 
                />
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
                            <ChatUI chat={current_chat} chat_message_map={chat_message_dict} setChatMessageMap={setChatMessageDict}></ChatUI>
                        </section>
                    </main>
                }
                {page==3 && 
                    <main id={styles.posting_main}><PostCard setPage={setPage}/></main>
                }
                {page==5 && 
                    <main id={styles.home_main}><Search/></main>
                }
            </div>
        </section>
    )
}