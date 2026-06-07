import './InfoQuery.scss'
import type { setStateProp } from '../types/props'

export default function ContactDetails(props:setStateProp){
    const setPage = props.setPage
    return (
        <section className='main_component'>
            <h1>How can we contact you</h1>
            <section id="userInfo" className="userInfo">
                <section className="card">
                        <section className="card_header">
                            <h3>Contact and Address</h3>
                        </section>
                        <section className="card_body">
                            <section className="form_fields ">

                                <section className="wrapper">
                                    <label>Email</label>
                                    <input id="email" type="email"/>
                                </section>

                                <section className="wrapper">
                                    <label>Phone number</label>
                                    <input id="phone" type="tel" placeholder="+27 00 000 000"/>
                                </section>

                                <section className="wrapper">
                                    <label>Street</label>
                                    <input id="street" type="text"/>
                                </section>

                                <section className="wrapper">
                                    <label>city</label>
                                    <input id="city" type="text"/>
                                </section>

                                <section className="wrapper">
                                    <label>Province/State</label>
                                    <input id="province" type="text"/>
                                </section>

                                <section className="wrapper">
                                    <label>Country</label>
                                    <input id="country" type="text"/>
                                </section>

                            </section>
                        </section>
                        <section className="edit_card_buttons">
                            <button className="prev" id="prev2" onClick={()=>setPage(0)}>prev</button>
                            <button className="next" id="next2" onClick={()=>setPage(2)}>next</button>
                        </section>
                        <h1 id="feedback1" className="feedback"></h1>
                    </section>
                </section>
        </section>
    )
}