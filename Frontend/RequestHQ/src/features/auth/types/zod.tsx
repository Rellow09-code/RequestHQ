import z from 'zod'

const passwordSchema = z.string()
        .min(8)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/)

const emailSchema = z.email()

export {passwordSchema, emailSchema}