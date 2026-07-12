import type { LogRequest } from "../types/specific_types"
import type { ApiResponse } from "../../../shared/types/apiTypes"

export default async function logUser(props:LogRequest):Promise<ApiResponse>{
    const {email, password} = props
    const base_url = import.meta.env.VITE_BACKEND_URL

    if (!email || !password){
        return {ok :false, response: null, error:'Invalid user information provided'}
    }

    try {
        console.log('sending request')
        const req_body:LogRequest = {
            'email' : email,
            'password' : password
        }
        const server_response:Response = await fetch(`${base_url}/logIn`,{
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