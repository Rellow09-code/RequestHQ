interface UserInfoType{
    name: string;
    middle_name: string;
    surname: string;
    birth_date: string;
}

interface ContactType{
    email:string,
    phone:string,
    street:string,
    city:string,
    province:string,
    country:string
}

type PasswordStrengthType = {
  score: number;
  label: "Very Weak" | "Weak" | "Medium" | "Strong" | "Very Strong";
};


interface SignRequestType{
    user_info : string,
    contact_info : string,
    password : string
}

interface LogRequestType{
    email:string,
    password:string
}

interface apiResponseType{
    ok:boolean,
    response: null|object,
    error:null|string
}

export type {UserInfoType, ContactType, PasswordStrengthType, SignRequestType, LogRequestType,apiResponseType}