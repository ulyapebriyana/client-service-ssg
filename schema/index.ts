import { z } from "zod"

export const registerSchema = z.object({
    name: z.string().min(3).max(30),
    email: z.string().email("Email tidak valid"),
    telegramId: z.string().min(4).max(15),
    password: z.string().min(6).max(10),
    passwordConfirmation: z.string().min(6).max(10)
}).refine((values) => {
    return values.password === values.passwordConfirmation
}, {
    message: "Password dan konfirmasi password harus sesuai",
    path: ["passwordConfirmation"]
})

export const loginSchema = z.object({
    telegramId: z.string().min(4, "Minimal 4 karakter").max(15, "Maksimal 15 karakter"),
    password: z.string().min(6, "Minimal 6 karakter").max(10, "Minimal 10 karakter"),
})

export const forgotPasswordSchema = z.object({
    telegramId: z.string().min(4, "Minimal 4 karakter").max(15, "Maksimal 15 karakter"),
})