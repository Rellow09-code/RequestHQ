import ProfileUI from "../components/ProfileUI"
import PostCard from "../components/PostCard"
import Icons from "../components/Icons"
import Card from "../components/Card"
import styles from './Home.module.scss'
import { useState } from "react"

export default function Home(){
    let [page, setPage] = useState(0)
    return(
        <>
            <header id={styles.main_header}>
                <ProfileUI/>
                <Icons/>
            </header>
            
            {page==0 && 
            <main id={styles.home_main}>
                <Card/>
                <Card/>
                <Card/>
            </main>}

            {page==1 && <main id={styles.posting_main}><PostCard/></main>}
        </>
    )
}