interface userType{
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

interface apiResponseType{
    ok:boolean,
    response: null|{message:string, user_info:userType},
    error:null|string
}

export type {userType, apiResponseType}