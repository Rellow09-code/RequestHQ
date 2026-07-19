import { z } from "zod";

export const signRequestSchema = z.object({
    user_info: z.object({
        name: z.string().min(2).max(30).regex(/^[A-Za-z]+$/),
        middle_name: z.string(),
        surname: z.string().min(2).max(30).regex(/^[A-Za-z]+$/),
        birth_date: z.iso.date()
    }),

    contact_info: z.object({
        email: z.string().email(),
        phone: z.e164(),
        street: z.string().min(2).max(60),
        city: z.string().min(2).max(60),
        province: z.string().min(2).max(60),
        country: z.string().min(2).max(60)
    }),

    password: z.string()
        .min(8)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/)
});

export const logRequestSchema = z.object({
    email: z.string().email(),
    password: z.string()
        .min(8)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/)
});

export const infoUpdateRequestSchema = z.object({
    user_info: z.object({
        name: z.string().min(2).max(30).regex(/^[A-Za-z]+$/),
        middle_name: z.string(),
        surname: z.string().min(2).max(30).regex(/^[A-Za-z]+$/),
        birth_date: z.iso.date()
    }),

    contact_info: z.object({
        email: z.string().email(),
        phone: z.e164(),
        street: z.string().min(2).max(60),
        city: z.string().min(2).max(60),
        province: z.string().min(2).max(60),
        country: z.string().min(2).max(60)
    }),

    password: z.string()
        .min(8)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/),
    id:z.string()
});