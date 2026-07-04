import styles from './InfoQuery.module.scss'
import type { setStateProp } from '../types/props'
import { useState } from 'react'
import type { UserInfoType } from '../types/specific_types'
import { z } from "zod";

export default function UserInfo({setPage}:setStateProp){
    let move_on = false
    //Try to get the existing info before initializing a new object
    const [user_info, setUserInfo] = useState<UserInfoType>(()=>{
        const saved_info = localStorage.getItem('user_info')
        return saved_info ?JSON.parse(saved_info)
        :{
            name:'',
            middle_name:'',
            surname:'',
            birth_date:''
        }
    })


    const [shake, setShake] = useState<boolean>(false)
    const [feed_back, setFeedBack] = useState<string>('')

    function checkUserInfo():string{
        const name_z = z.string()
            .min(2,{message: 'Expected the name to be atleast 2 characters'})
            .max(30,{message: 'Expected the name to be less than 30 characters'})
            .regex(/^[A-Za-z]+$/,{message: 'Expected name to start with uppercase, the preceed with lowercase letters'})
        const surname_z = z.string()
            .min(2,{message: 'Expected the surname to be atleast 2 characters'})
            .max(30,{message: 'Expected the surname to be less than 30 characters'})
            .regex(/^[A-Za-z]+$/,{message: 'Expected the name to be atleast 2 characters'})
        const birth_date_z = z.iso.date({message: 'Expected the birth date to be an actual date'})

        let name_results = name_z.safeParse(user_info.name)
        let surname_results =surname_z.safeParse(user_info.surname)
        let birth_date_results = birth_date_z.safeParse(user_info.birth_date)

        if (!name_results.success){
            const issue = name_results.error.issues[0].message
            console.log(issue)
            move_on = false
            return issue;
        }
        if (!surname_results.success){
            const issue = surname_results.error.issues[0].message
            move_on = false
            return issue;
        }
        if (!birth_date_results.success){
            const issue = birth_date_results.error.issues[0].message
            move_on = false
            return issue;
        }
        move_on = true
        return 'Good'
    }

    function updateUserInfo(key:string, value:any){
        setUserInfo((old_obj:UserInfoType)=>{
            return {...old_obj, [key]:value}
        })
        setFeedBack(checkUserInfo())
    }

    //Go to the next page if all necessary info is provided
    function next_page(){
        setFeedBack(checkUserInfo())
        if (!move_on){
            return
        }
        for (let [key,value] of Object.entries(user_info)){
            if (['middle_name'].includes(key)){
                continue
            }
            //Check if the input is valid
            if (! value){
                setFeedBack(`Please fill in ${key}`)

                //shake the feedback
                setShake(true)
                setTimeout(() => {
                    setShake(false)
                }, 2000);

                return
            }
        }
        localStorage.setItem('user_info',JSON.stringify(user_info))
        setPage(1)
        
    }

    return (
        <section className={styles.main_component}>
            <h1>Tell us about yourself</h1>
            <section id={styles.userInfo} className={styles.userInfo}>
                <section className={styles.card}>
                    <section className={styles.card_header}>
                        <h3>Who am I?</h3>
                    </section>
                    <section className={styles.card_body}>
                        <section className={styles.form_fields }>

                            <section className={styles.wrapper}>
                                <label>Name</label>
                                <input value={user_info.name} id={styles.name} type="text" onChange={(e)=>updateUserInfo('name',e.target.value)}/>
                            </section>

                            <section className={styles.wrapper}>
                                <label>Middle Name</label>
                                <input value={user_info.middle_name} id={styles.middle_name} type="text" onChange={(e)=>updateUserInfo('middle_name',e.target.value)}/>
                            </section>

                            <section className={styles.wrapper}>
                                <label>Surname</label>
                                <input value={user_info.surname} id={styles.surname} type="text" onChange={(e)=>updateUserInfo('surname',e.target.value)}/>
                            </section>

                            <section className={styles.wrapper}>
                                <label>Birth date</label>
                                <input value={user_info.birth_date} id={styles.birth_date} type="date" onChange={(e)=>updateUserInfo('birth_date',e.target.value)}/>
                            </section>

                        </section>
                    </section>
                    <section className={styles.edit_card_buttons}>
                        <button className={styles.next} id={styles.next} onClick={next_page}>next</button>
                    </section>
                    <h1 id={styles.feedback} className={`${styles.feedback} ${shake?styles.shake:''}`}>{feed_back}</h1>
                </section>
            </section>
        </section>
    )
}