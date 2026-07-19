import styles from '../../auth/pages/SignUp.module.scss'
import { useEffect, useState } from "react";
import UserInfo from '../../auth/components/UserInfo';
import ContactDetails from '../../auth/components/ContactDetails';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../shared/components/Loading';
import updateInfo from '../services/updateInfo';

let userInfo:string|null
let contactInfo:string|null
let user_password:string|null

export default function UpdateInfo(){
    const navigate = useNavigate()
    const [load, setLoad] = useState<boolean>(false)
    useEffect(()=>{
        async function backUp() {
            userInfo = localStorage.getItem('user_info') || null
            contactInfo = localStorage.getItem('contact_info') || null
            user_password = localStorage.getItem('password') || null
        }
        backUp()
    },[])
    async function restore() {
        if (!userInfo||!contactInfo||!user_password){
            return
        }
        localStorage.setItem('user_info',userInfo)
        localStorage.setItem('contact_info',contactInfo)
        localStorage.setItem('password',user_password)
    }
    const [page_no, setPage] = useState(0)

    async function userUpdate(){
        setLoad(true)
        await doUserUpdate()
        setLoad(false)
    }
    async function doUserUpdate() {
        let results = await updateInfo()
        if (!results.ok){
            alert('Failed to update your information')
            return
        }
        navigate('/Home')
    }

    async function cancelOperation(){
        setLoad(true)
        await restore()
        navigate('/Home')
        setLoad(false)
    }

    return (
        <>
            <Loading show={load}/>
            <main id={styles.main_header}>
                {page_no == 0 && <UserInfo setPage={setPage}/>}
                {page_no == 1 && <ContactDetails setPage={setPage}/>}
                {page_no == 2 && <div className={styles.info_buttons}>
                    <button onClick={userUpdate}>Save</button>
                    <button onClick={cancelOperation}>Cancel</button>
                    </div>}
            </main>
        </>
    )
}