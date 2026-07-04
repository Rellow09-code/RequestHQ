import styles from './InfoQuery.module.scss'
import type { setStateProp } from '../types/props'
import type { ContactType } from '../types/specific_types'
import { useState } from 'react'
import { z } from "zod";

export default function ContactDetails({setPage}:setStateProp){
    let move_on = false
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

    function checkContact(): string {
        const email_z = z.string().email({
            message: "Expected a valid email address"
        });
        console.log(email_z.safeParse("businessnelthighs"));
        const phone_z = z.e164({
            message: "Expected a valid phone number in +XX XXX XXX XXXX +- format, with less than 16 numbers"
        });

        const street_z = z.string()
            .min(2, { message: "Expected the street to be at least 2 characters" })
            .max(60, { message: "Expected the street to be less than 60 characters" });

        const city_z = z.string()
            .min(2, { message: "Expected the city to be at least 2 characters" })
            .max(60, { message: "Expected the city to be less than 60 characters" });

        const province_z = z.string()
            .min(2, { message: "Expected the province to be at least 2 characters" })
            .max(60, { message: "Expected the province to be less than 60 characters" });

        const country_z = z.string()
            .min(2, { message: "Expected the country to be at least 2 characters" })
            .max(60, { message: "Expected the country to be less than 60 characters" });

        const email_results = email_z.safeParse(contact_info.email);
        const phone_results = phone_z.safeParse(contact_info.phone);
        const street_results = street_z.safeParse(contact_info.street);
        const city_results = city_z.safeParse(contact_info.city);
        const province_results = province_z.safeParse(contact_info.province);
        const country_results = country_z.safeParse(contact_info.country);

        if (!email_results.success) {
            move_on = false
            return email_results.error.issues[0].message;
        }
        if (!phone_results.success) {
            move_on = false
            return phone_results.error.issues[0].message;
        }
        if (!street_results.success) {
            move_on = false
            return street_results.error.issues[0].message;
        }
        if (!city_results.success) {
            move_on = false
            return city_results.error.issues[0].message;
        }
        if (!province_results.success) {
            move_on = false
            return province_results.error.issues[0].message;
        }
        if (!country_results.success) {
            move_on = false
            return country_results.error.issues[0].message;
        }
        move_on = true;
        return "Good";
}

    const [shake, setShake] = useState<boolean>(false)
    const [feed_back, setFeedBack] = useState<string>('')

    function updateContactInfo(key:string, value:any){
        setContactInfo((old_obj:ContactType) =>{
            return {...old_obj, [key]:value}
        })
    }

    //Go to the next page if all necessary info is provided
    function go_to_page(page_no:number){
        setFeedBack(checkContact())
        if (!move_on){
            return
        }
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