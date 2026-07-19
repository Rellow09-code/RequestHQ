import type { SignRequest } from "../../auth/types/specific_types"
import type { ApiResponse } from "../../../shared/types/apiTypes"

interface updateRequest extends SignRequest{
    id:string
}
export default async function updateInfo():Promise<ApiResponse>{
    const userInfo:string = await JSON.parse(localStorage.getItem('user_info') || '{}')
    const contactInfo:string = await JSON.parse(localStorage.getItem('contact_info') || '{}')
    const user_password:string = localStorage.getItem('password') || ''
    const id = localStorage.getItem('id')
    const base_url = import.meta.env.VITE_BACKEND_URL
    
    if (!userInfo || !contactInfo || !user_password){
        return {ok :false, response: null, error:'Invalid user information provided'}
    }

    try {
        console.log('sending request')
        const req_body:updateRequest = {
            'user_info' : userInfo,
            'contact_info' : contactInfo,
            'password' : user_password,
            'id':`${id}`
        }
        const server_response:Response = await fetch(`${base_url}/infoUpdate`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body : JSON.stringify(req_body)
        })
        const response_json = await server_response.json()
        if (!server_response.ok){
            const results:ApiResponse = {ok: false, response: response_json, error:`${server_response.statusText}: ${response_json.error}`}
            return results
        }
        const results:ApiResponse = {ok: true, response: response_json, error:null}
        return results
    }
    catch (error){
        console.log(`${error}`)
        const results:ApiResponse = {ok :false, response: null, error: `${error}`}
        return results
    }
}