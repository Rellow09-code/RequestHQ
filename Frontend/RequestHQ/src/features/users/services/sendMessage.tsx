export default async function sendMessage(receiver_id:string, message:string) {
      try{
        const id:string|null = localStorage.getItem('id')
        if (!id){
            alert('Something went wrong, please try sigining in again')
            return {ok: false, response: null, error:`An error occured`}
        }
        if (!receiver_id){
            alert('Unknown user (Null receiver)')
            return {ok: false, response: null, error:`An error occured`}
        }
        console.log('trying to send a message')
        console.log(id)
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