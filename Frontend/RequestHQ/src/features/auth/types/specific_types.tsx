interface UserInfo{
    name: string;
    middle_name: string;
    surname: string;
    birth_date: string;
}

interface Contact{
    email:string,
    phone:string,
    street:string,
    city:string,
    province:string,
    country:string
}

type PasswordStrength = {
  score: number;
  label: "Very Weak" | "Weak" | "Medium" | "Strong" | "Very Strong";
};


interface SignRequest{
    user_info : string,
    contact_info : string,
    password : string
}

interface LogRequest{
    email:string,
    password:string
}

export type {UserInfo, Contact, PasswordStrength, SignRequest, LogRequest}