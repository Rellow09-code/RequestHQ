import { useNavigate } from "react-router-dom";
import styles from "./SideMenu.module.scss";
interface props{
    show:boolean
    toogleMenu:Function
    tooglePictureMenu:React.Dispatch<React.SetStateAction<boolean>>
}

export default function SideMenu({show, toogleMenu,tooglePictureMenu}:props) {
    const navigate = useNavigate()
    if (!show){
        return null
    }
    return (
        <aside className={styles.side_menu}>
            <h3 className={styles.title}>Settings</h3>

            <button className={styles.menu_item} onClick={()=>navigate('/updateInfo')}>
                <span className="material-icons">person</span>
                Update Personal Info
            </button>

            <button className={styles.menu_item} onClick={()=>tooglePictureMenu(true)}>
                <span className="material-icons">image</span>
                Edit Profile Picture
            </button>

            <button className={styles.menu_item}>
                <span className="material-icons">settings</span>
                General Settings
            </button>

            <button className={styles.menu_item} onClick={()=>toogleMenu(false)}>
                <span className="material-icons">cancel</span>
                Cancel
            </button>
        </aside>
    );
}