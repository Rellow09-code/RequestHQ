import type { userType } from "../../../shared/types/apiTypes";
import type { postCardType } from "../types/commonTypes";

export default async function postCard(card:postCardType) {
    const {title='', body='', picture=null} = card
    const form_data:FormData = new FormData()
    if (picture){
        form_data.append('picture',picture)
    }
    if (!body){
        return {ok: false, response: null, error:`Invalid post body`}
    }

    try{
        console.log('trying to post')
        const url:string = import.meta.env.VITE_BACKEND_URL
        const user_str:string|null = localStorage.getItem('user')
        if (!user_str){
            throw Error('Invalid user, please try signing in again')
        }
        const user:userType = JSON.parse(user_str)

        const response:Response = await fetch(`${url}/post`, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body :JSON.stringify({
                form_data :form_data,
                id : user.id,
                title,
                body,
            })
        })
        const response_json = await response.json()
        if (!response.ok){
            return {ok: false, response: response_json, error:`${response.statusText}: ${response_json.error}`}
        }
        return {ok: true, response: response_json, error:null}

    }catch(error){
        return {ok: false, response: null, error:`An error occured: ${error}`}
    }
}