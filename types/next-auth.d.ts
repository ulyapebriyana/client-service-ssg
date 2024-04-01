import NextAuth from "next-auth"

declare module "next-auth" {
    interface User {
        id: string,
        telegramId: string,
        isAdmin: boolean
    }

    interface Session {
        user: User & {
            userId: string
            telegramId: string
            isAdmin: boolean
        },
        token: {
            userId: string,
            telegramId: string,
            isAdmin: boolean
        }
    }
}