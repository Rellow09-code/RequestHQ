export default function startServer(){
    fetch(`${import.meta.env.VITE_BACKEND_URL}`).then(res =>{
        console.log(res)
    })
}