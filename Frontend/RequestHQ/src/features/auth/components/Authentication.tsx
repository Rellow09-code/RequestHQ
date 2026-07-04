import styles from './InfoQuery.module.scss'
import type { setStateProp } from '../types/props'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { gaugePasswordStrength } from '../services/passwordStrength'
import type { PasswordStrengthType } from '../types/specific_types'
import type { apiResponseType } from '../../../shared/types/apiTypes'
import signInUser from '../services/signUser'
import Loading from '../../../shared/components/Loading'

export default function Authentication(props:setStateProp){
    const [password, setPassword] = useState<string>('')
    const [confirm_password, setConfirmPassword] = useState<string>('')
    const [password_stats, setPasswordStats] = useState<PasswordStrengthType>(gaugePasswordStrength(password))
    const [shake, setShake] = useState<boolean>(false)
    const [server_response, setServerResponse] = useState<string>('')
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    useEffect(()=>setPasswordStats(gaugePasswordStrength(password)), [password])

    function submit(){
        //check for weak passwords
        if (password_stats.score < 5){
            //shake the feedback
            setShake(true)
            setTimeout(() => {
                setShake(false)
            }, 2000);
            return
        }
        localStorage.setItem('password',password)
        setServerResponse('')
    
        setLoading(true)
        try{
            signInUser().then((results:apiResponseType)=>{
                if (results.ok){
                    if (!results.response?.user_info){
                        setServerResponse(`An unknown error occured`)
                        return
                    }
                    const user_info_str : string = JSON.stringify(results.response.user_info)
                    localStorage.setItem('user',user_info_str)
                    navigate('/Home')
                    return
                }
                setServerResponse(`${results.error}`)
            })
        }
        finally{
            setLoading(false)
        }
    }

    const setPage = props.setPage
    return (
        <section className={styles.main_component}>
            <Loading show={loading} message='Signing in...'/>
            <h1>Keep your account safe</h1>
            <section id={styles.userInfo} className={styles.userInfo}>
                <section className={styles.card}>
                    <section className={styles.card_header}>
                        <h3>Authentication Setup</h3>
                    </section>
                    <section className={styles.card_body}>
                        <section className={styles.form_fields }>

                            <section className={styles.wrapper}>
                                <label>Password</label>
                                <input value={password} id={styles.password} type="password" onChange={(e)=>setPassword(e.target.value)}/>
                            </section>

                            <section className={styles.wrapper}>
                                <label>Confirm Password</label>
                                <input value={confirm_password} id={styles.confirm_password} type="password" onChange={(e)=>setConfirmPassword(e.target.value)}/>
                            </section>

                        </section>
                    </section>
                    <section className={styles.edit_card_buttons}>
                        <button className={styles.prev} id={styles.prev3} onClick={()=>setPage(1)}>prev</button>
                        <button className={styles.next} id={styles.Submit} onClick={submit}>Submit</button>
                    </section>
                    <h1 className={styles.feedback}>
                        password rules: <br />
                        1. Minimum password characters is 8<br />
                        2. Passwords must contain special characters<br />
                        3. Passwords must contain atleast on uppercase alphabet<br />
                        4. Passwords must also contain a small letter<br />
                    </h1>
                    <h1 id={styles.feedback2} className={`${styles.feedback} ${shake?styles.shake:''}`} style={{
                        ['--color-score']: `${password_stats.score/5}`
                    } as React.CSSProperties}>
                        {password === confirm_password ? `Your password is ${password_stats.label}`:'The passwords do not match'}
                    </h1>
                    <h1 id={styles.feedback2} className={`${styles.feedback} ${shake?styles.shake:''}`}>{server_response}</h1>
                </section>
            </section>
        </section>
    )
}