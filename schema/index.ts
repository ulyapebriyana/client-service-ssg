import { z } from "zod"

export const registerSchema = z.object({
    name: z.string().min(3).max(30),
    email: z.string().email(),
    telegramId: z.string().min(4).max(15),
    password: z.string().min(6).max(10),
    passwordConfirmation: z.string().min(6).max(10)
}).refine((values) => {
    return values.password === values.passwordConfirmation
}, {
    message: "password and passwordConfirmation must match",
    path: ["passwordConfirmation"]
})

export const loginSchema = z.object({
    telegramId: z.string().min(4).max(15),
    password: z.string().min(6).max(10),
})