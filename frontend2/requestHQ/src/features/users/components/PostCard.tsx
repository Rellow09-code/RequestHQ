import ProfileUI from "./ProfileUI"
import './Card.scss'

export default function PostCard(){
    return (
        <div className="card">
            <section className="card_header">
                <ProfileUI/>
                <h3><input id="post_title" type="text" placeholder="Title"/></h3>
            </section>
            <section className="card_body">
                <textarea id="post_text" placeholder="text"></textarea>
                <div className="image_upload">
                    <label>Upload a picture</label>
                    <input id="post_picture" type="file" accept="image/*"/>
                </div>
            </section>
            <section className="edit_card_buttons">
                <button id="cancel_post">Cancel</button>
                <button id="post">Post</button>
            </section>
        </div>
    )
}