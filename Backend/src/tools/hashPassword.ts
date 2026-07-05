import bcrypt from 'bcrypt'
export async function hashPassword(password:string):Promise<string>{
    const salt_rounds = 13;
    const hashed_password = await bcrypt.hash(password, salt_rounds)
    return hashed_password
}

export async function compareHashes(password:string,hashedPassword:string):Promise<boolean>{
    const results = await bcrypt.compare(password,hashedPassword)
    return results
}