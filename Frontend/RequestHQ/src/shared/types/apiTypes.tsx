interface User{
    birth_date: string,
    created_at: string,
    email: string,
    id: string,
    location: string,
    middle_name: string|null,
    name: string,
    password: string,
    phone_number: string,
    picture: string|null,
    surname: string,
}

interface ApiResponse{
    ok:boolean,
    response: null|{message:string, user_info:User},
    error:null|string
}

export type {User, ApiResponse}