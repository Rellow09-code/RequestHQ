import styles from './InfoQuery.module.scss'
import type { setStateProp } from '../types/props'
import type { ContactType } from '../types/specific_types'
import { useState } from 'react'

export default function ContactDetails({setPage}:setStateProp){
    //Try to get the existing info before initializing a new object
    const [contact_info, setContactInfo] = useState<ContactType>(()=>{
        const saved_info = localStorage.getItem('contact_info')
        return saved_info ? JSON.parse(saved_info)
        :{
            email:'',
            phone:'',
            street:'',
            city:'',
            province:'',
            country:''
        }
    })

    const [shake, setShake] = useState<boolean>(false)
    const [feed_back, setFeedBack] = useState<string>('')

    function updateContactInfo(key:string, value:any){
        setContactInfo((old_obj:ContactType) =>{
            return {...old_obj, [key]:value}
        })
    }

    //Go to the next page if all necessary info is provided
    function go_to_page(page_no:number){
        for (let [key,value] of Object.entries(contact_info)){
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
        setFeedBack(``)
        localStorage.setItem('contact_info',JSON.stringify(contact_info))
        setPage(page_no)
        
    }

    return (
        <section className={styles.main_component}>
            <h1>How can we contact you</h1>
            <section id={styles.userInfo} className={styles.userInfo}>
                <section className={styles.card}>
                        <section className={styles.card_header}>
                            <h3>Contact and Address</h3>
                        </section>
                        <section className={styles.card_body}>
                            <section className={styles.form_fields }>

                                <section className={styles.wrapper}>
                                    <label>Email</label>
                                    <input value={contact_info.email} id={styles.email} type="email" onChange={e=>updateContactInfo('email',e.target.value)}/>
                                </section>

                                <section className={styles.wrapper}>
                                    <label>Phone number</label>
                                    <input value={contact_info.phone} id={styles.phone} type="tel" placeholder="+27 00 000 000" onChange={e=>updateContactInfo('phone',e.target.value)}/>
                                </section>

                                <section className={styles.wrapper}>
                                    <label>Street</label>
                                    <input value={contact_info.street} id={styles.street} type="text" onChange={e=>updateContactInfo('street',e.target.value)}/>
                                </section>

                                <section className={styles.wrapper}>
                                    <label>city</label>
                                    <input value={contact_info.city} id={styles.city} type="text" onChange={e=>updateContactInfo('city',e.target.value)}/>
                                </section>

                                <section className={styles.wrapper}>
                                    <label>Province/State</label>
                                    <input value={contact_info.province} id={styles.province} type="text" onChange={e=>updateContactInfo('province',e.target.value)}/>
                                </section>

                                <section className={styles.wrapper}>
                                    <label>Country</label>
                                    <input value={contact_info.country} id={styles.country} type="text on" onChange={e=>updateContactInfo('country',e.target.value)}/>
                                </section>

                            </section>
                        </section>
                        <section className={styles.edit_card_buttons}>
                            <button className={styles.prev} id={styles.prev2} onClick={()=>go_to_page(0)}>prev</button>
                            <button className={styles.next} id={styles.next2} onClick={()=>go_to_page(2)}>next</button>
                        </section>
                        <h1 id={styles.feedback} className={`${styles.feedback} ${shake?styles.shake:''}`}>{feed_back}</h1>
                    </section>
                </section>
        </section>
    )
}