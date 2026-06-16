import styles from './InfoQuery.module.scss'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import type { apiResponseType } from '../../../shared/types/apiTypes'
import logUser from '../services/logUser'
import { emailSchema, passwordSchema } from '../types/zod'

export default function LogInAuthentication(){
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [shake, setShake] = useState<boolean>(false)
    const [feedback, setFeedback] = useState<string>('')
    const navigate = useNavigate()

    function submit(){
        //check for valid input
        const emailValid = emailSchema.safeParse(email)
        const passwordValid = passwordSchema.safeParse(password)

        if (!emailValid.success || !passwordValid.success){
            setFeedback('Please recheck your password or email')
            //shake the feedback
            setShake(true)
            setTimeout(() => {
                setShake(false)
            }, 2000);
            return
        }
        setFeedback('')
        logUser({email,password}).then((results:apiResponseType)=>{
            if (results.ok){
                if (!results.response?.user_info){
                    setFeedback(`An unknown error occured`)
                    return
                }
                const user_info_str : string = JSON.stringify(results.response.user_info)
                localStorage.setItem('user',user_info_str)
                navigate('/Home')
                return
            }
            setFeedback(`${results.error}`)
        })
    }

    return (
        <section className={styles.main_component}>
            <h1>Welcome back</h1>
            <section id={styles.userInfo} className={styles.userInfo}>
                <section className={styles.card}>
                    <section className={styles.card_header}>
                        <h3>Log into your account</h3>
                    </section>
                    <section className={styles.card_body}>
                        <section className={styles.form_fields }>

                            <section className={styles.wrapper}>
                                <label>Email</label>
                                <input value={email} id={styles.email} type="email" onChange={(e)=>setEmail(e.target.value)}/>
                            </section>

                            <section className={styles.wrapper}>
                                <label>Password</label>
                                <input value={password} id={styles.password} type="text" onChange={(e)=>setPassword(e.target.value)}/>
                            </section>

                        </section>
                    </section>
                    <h1 className={`${styles.feedback} ${shake?styles.shake:''}`}>
                        {feedback}
                    </h1>
                    <section className={styles.edit_card_buttons}>
                        <button className={styles.next} id={styles.Submit} onClick={submit}>Submit</button>
                    </section>
                </section>
            </section>
        </section>
    )
}