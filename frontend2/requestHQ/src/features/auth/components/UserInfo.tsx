import './InfoQuery.scss'
import type { setStateProp } from '../types/props'
import { useEffect, useState } from 'react'
import type { UserInfoType } from '../types/specific_types'

export default function UserInfo({setPage}:setStateProp){
    const [user_info, setUserInfo] = useState<UserInfoType>({
            name:'',
            middle_name:'',
            surname:'',
            birth_date:''
        })

    function updateUserInfo(key:string, value:any){
        setUserInfo(old_obj=>{
            return {...old_obj, [key]:value}
        })
    }

    function submit(){

    }

    return (
        <section className='main_component'>
            <h1>Tell us about yourself</h1>
            <section id="userInfo" className="userInfo">
                <section className="card">
                    <section className="card_header">
                        <h3>Who am I?</h3>
                    </section>
                    <section className="card_body">
                        <section className="form_fields ">

                            <section className="wrapper">
                                <label>Name</label>
                                <input value={user_info.name} id="name" type="text" onChange={(e)=>updateUserInfo('name',e.target.value)}/>
                            </section>

                            <section className="wrapper">
                                <label>Middle Name</label>
                                <input id="middle_name" type="text" onChange={(e)=>updateUserInfo('middle_name',e.target.value)}/>
                            </section>

                            <section className="wrapper">
                                <label>Surname</label>
                                <input id="surname" type="text" onChange={(e)=>updateUserInfo('surname',e.target.value)}/>
                            </section>

                            <section className="wrapper">
                                <label>Birth date</label>
                                <input id="birth_date" type="date" onChange={(e)=>updateUserInfo('birth_date',e.target.value)}/>
                            </section>

                        </section>
                    </section>
                    <section className="edit_card_buttons">
                        <button className="next" id="next" onClick={()=>setPage(1)}>next</button>
                    </section>
                    <h1 id="feedback" className="feedback"></h1>
                </section>
            </section>
        </section>
    )
}