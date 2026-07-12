export default async function getRecentMessages(chat_id:string, time_stamp:string){
    try{
        const url:string = import.meta.env.VITE_BACKEND_URL
        const response:Response = await fetch(`${url}/getRecentMessages?chat_id=${chat_id}&from_at=${time_stamp}`,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const response_json = await response.json()
        if (!response.ok){
            return {ok: false, response: response_json, error:`${response.statusText}: ${response_json.error}`}
        }
        console.log(response_json)
        return {ok: true, response: response_json, error:null}

    }catch(error){
        console.log(`An error occured: ${error}`)
        return {ok: false, response: null, error:`An error occured: ${error}`}
    }
}