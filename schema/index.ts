import { z } from "zod"

export const registerSchema = z.object({
    name: z.string().min(3, "3 Minimal karakter").max(30, "30 Maksimal karakter"),
    email: z.string().email("Email tidak valid"),
    telegramId: z.string().min(4, "4 Minimal karakter").max(15, "15 Maksimal karakter"),
    password: z.string().min(6, "6 Minimal karakter").max(10, "10 Maksimal karakter"),
    passwordConfirmation: z.string().min(6, "6 Minimal karakter").max(10, "10 Maksimal karakter")
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

export const resetPasswordSchema = z.object({
    password: z.string().min(6, "Minimal 6 karakter").max(10, "10 Maksimal karakter"),
    passwordConfirmation: z.string().min(6, "Minimal 6 karakter").max(10, "10 Maksimal karakter")
}).refine((values) => {
    return values.password === values.passwordConfirmation
}, {
    message: "Password dan konfirmasi password harus sesuai",
    path: ["passwordConfirmation"]
})