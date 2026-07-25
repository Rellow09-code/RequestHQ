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
    function changeTheme(theme: "light" | "dark" | "requestHQ") {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }
    return (
        <aside className={styles.side_menu}>
            <h3 className={styles.title}>Settings</h3>

            <button
                className={styles.menu_item}
                onClick={() => navigate('/updateInfo')}
            >
                <span className="material-icons">person</span>
                Update Personal Info
            </button>

            <button
                className={styles.menu_item}
                onClick={() => tooglePictureMenu(true)}
            >
                <span className="material-icons">image</span>
                Edit Profile Picture
            </button>

            {/* Theme selector */}
            <div className={styles.theme_container}>
                <div className={styles.theme_label}>
                    <span className="material-icons">palette</span>
                    <span>Theme</span>
                </div>

                <div className={styles.theme_buttons}>
                    <button
                        className={styles.theme_button}
                        onClick={() => changeTheme("light")}
                    >
                        <span className="material-icons">light_mode</span>
                        <span>Light</span>
                    </button>

                    <button
                        className={styles.theme_button}
                        onClick={() => changeTheme("dark")}
                    >
                        <span className="material-icons">dark_mode</span>
                        <span>Dark</span>
                    </button>

                    <button
                        className={styles.theme_button}
                        onClick={() => changeTheme("requestHQ")}
                    >
                        <span className="material-icons">auto_awesome</span>
                        <span>RequestHQ</span>
                    </button>
                </div>
            </div>

            <button
                className={styles.menu_item}
                onClick={() => toogleMenu(false)}
            >
                <span className="material-icons">cancel</span>
                Cancel
            </button>
        </aside>
    );
}