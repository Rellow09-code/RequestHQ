import dotenv from 'dotenv';
dotenv.config();

//Error class
export class ErrorClass{
    constructor(){
        
    }
}

export async function callServer(){
    const response = await fetch('import.meta.env.BACKEND_URL',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: 'John' })
    })
}