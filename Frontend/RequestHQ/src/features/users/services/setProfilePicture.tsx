export default async function setProfilePicture(picture:File){
    try{
        const id:string|null = localStorage.getItem('id')
        if (!id){
            alert('Try re-logging in, user not recognized')
            return {ok: false, response: null, error:`user not recognized`}
        }
        const form_data:FormData = new FormData()
        if (picture){
            form_data.append('picture',picture)
        }
        else{
            return {ok: false, response: null, error:`Invalid picture`}
        }

        const url:string = import.meta.env.VITE_BACKEND_URL
        const response:Response = await fetch(`${url}/setProfilePicture?id=${id}`, {
            method : 'POST',
            body :form_data
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