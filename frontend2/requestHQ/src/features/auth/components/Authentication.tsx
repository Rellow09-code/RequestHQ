import './InfoQuery.scss'
import type { setStateProp } from '../types/props'
import { Link } from 'react-router-dom'

export default function Authentication(props:setStateProp){
    const setPage = props.setPage
    return (
        <section className='main_component'>
            <h1>Keep your account safe</h1>
            <section id="userInfo" className="userInfo">
                <section className="card">
                    <section className="card_header">
                        <h3>Authentication Setup</h3>
                    </section>
                    <section className="card_body">
                        <section className="form_fields ">

                            <section className="wrapper">
                                <label>Password</label>
                                <input id="password" type="password"/>
                            </section>

                            <section className="wrapper">
                                <label>Confirm Password</label>
                                <input id="confirm_password" type="password"/>
                            </section>

                        </section>
                    </section>
                    <section className="edit_card_buttons">
                        <button className="prev" id="prev3" onClick={()=>setPage(1)}>prev</button>
                        <Link className="next" id="Submit" to={'/Home'}>Submit</Link>
                    </section>
                    <h1 id="feedback2" className="feedback"></h1>
                </section>
            </section>
        </section>
    )
}