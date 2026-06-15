import type { apiResponseType, SignRequestType } from "../types/specific_types"

export default async function signInUser():Promise<apiResponseType>{
    const userInfo:string = await JSON.parse(localStorage.getItem('user_info') || '{}')
    const contactInfo:string = await JSON.parse(localStorage.getItem('contact_info') || '{}')
    const user_password:string = localStorage.getItem('password') || ''
    const base_url = import.meta.env.VITE_BACKEND_URL
    
    if (!userInfo || !contactInfo || !user_password){
        return {ok :false, response: null, error:'Invalid user information provided'}
    }

    try {
        console.log('sending request')
        const req_body:SignRequestType = {
            'user_info' : userInfo,
            'contact_info' : contactInfo,
            'password' : user_password
        }
        const server_response:Response = await fetch(`${base_url}/signIn`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body : JSON.stringify(req_body)
        })
        const response_json = await server_response.json()
        if (!server_response.ok){
            return {ok: false, response: response_json, error:`${server_response.statusText}: ${response_json.error}`}
        }
        return {ok: true, response: response_json, error:null}
    }
    catch (error){
        console.log(`${error}`)
        return {ok :false, response: null, error: `${error}`}
    }
}