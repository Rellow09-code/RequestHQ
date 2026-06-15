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

interface responseType{
    message:string,
    status:string
}
export interface SignRequestType {
    user_info: {
        name: string;
        middle_name: string;
        surname: string;
        birth_date: string; // YYYY-MM-DD
    };

    contact_info: {
        email: string;
        phone: string; // +27XXXXXXXXX
        street: string;
        city: string;
        province: string;
        country: string;
    };

    password: string;
}

export type {UserInfoType, ContactType, PasswordStrengthType, SignRequestType}