import UserInfo from "../components/UserInfo";
import ContactDetails from "../components/ContactDetails";
import Authentication from "../components/Authentication";
import styles from './SignUp.module.scss'
import { useState } from "react";


export default function SignUp(){
    const [page_no, setPage] = useState(0)


    return (
        <>
            <main id={styles.main_header}>
                {page_no == 0 && <UserInfo setPage={setPage}/>}
                {page_no == 1 && <ContactDetails setPage={setPage}/>}
                {page_no == 2 && <Authentication setPage={setPage}/>}
            </main>
        </>
    )
}