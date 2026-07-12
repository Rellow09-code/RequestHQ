export default async function sendMessage(id:string, receiver_id:string, message:string) {
      try{
        console.log('trying to send a message')
        const url:string = import.meta.env.VITE_BACKEND_URL
        const response:Response = await fetch(`${url}/sendMessage`, {
            method : 'POST',
            headers:{
                "content-type":'application/json'
            },
            body :JSON.stringify({
                id:id, receiver_id:receiver_id, message:message
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