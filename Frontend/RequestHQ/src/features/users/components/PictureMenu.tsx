import { useState } from "react";
import styles from "./PictureMenu.module.scss";
import Loading from "../../../shared/components/Loading";
import setProfilePicture from "../services/setProfilePicture";
interface prop{
    show:boolean
    tooglePictureMenu: React.Dispatch<React.SetStateAction<boolean>>
}
export default function PictureMenu({show, tooglePictureMenu}:prop) {
    if (!show){return null}
    const [load,setLoad] = useState<boolean>(false)
    const [file,setFile] = useState<File|undefined>()
    const [preview, setPreview] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<string>('')

    function choosePicture(e: React.ChangeEvent<HTMLInputElement>) {
        setFile(e.target.files?.[0])

        if (!file) return;

        setPreview(URL.createObjectURL(file));
    }

    async function uploadProfilePicture() {
        setLoad(false)
        await doUploadProfilePicture()
        setLoad(false)
    }
    async function doUploadProfilePicture(){
        if (!file){
            setFeedback('Select a valid picture')
            return
        }
        setFeedback('')
        let results = await setProfilePicture(file)
        if (!results.ok){
            setFeedback(results.error || 'error')
            return
        }
        setFeedback('')
        tooglePictureMenu(false)
        //window.location.reload()
    }

    return (
        <div className={styles.overlay}>
            <Loading show={load}/>
            <section className={styles.picture_menu}>
                <h2>Profile Picture</h2>

                <div className={styles.preview}>
                    {preview ? (
                        <img src={preview} alt="Preview" />
                    ) : (
                        <span className="material-icons">
                            account_circle
                        </span>
                    )}
                </div>

                <input
                    id="picture_picker"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={choosePicture}
                />

                <label
                    htmlFor="picture_picker"
                    className={styles.choose_button}
                >
                    Choose Picture
                </label>
                <p className={styles.feedback}>{feedback}</p>
                <div className={styles.buttons}>
                    <button className={styles.save} onClick={uploadProfilePicture}>
                        Save
                    </button>

                    <button className={styles.cancel} onClick={()=>tooglePictureMenu(false)}>
                        Cancel
                    </button>
                </div>
            </section>
        </div>
    );
}