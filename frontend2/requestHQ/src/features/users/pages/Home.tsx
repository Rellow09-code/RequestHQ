import ProfileUI from "../components/ProfileUI"
import PostCard from "../components/PostCard"
import Icons from "../components/Icons"
import Card from "../components/Card"
import './Home.scss'
export default function Home(){
    return(
        <>
            <header id="main_header">
            <ProfileUI/>
            <Icons/>
            </header>
            {0 && <main id="home_main"></main>}
            {0 && <main id="posting_main"><PostCard/></main>}
            <Card/>
        </>
    )
}