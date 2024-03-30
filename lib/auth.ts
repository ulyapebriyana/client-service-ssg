import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import type { NextAuthOptions } from "next-auth"
import { getServerSession } from "next-auth"
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/db"
import bcrypt from "bcrypt"

export const config = {
    adapter: PrismaAdapter(prisma) as Adapter,
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                telegramId: { label: "TelegramId", type: "text", placeholder: "2323232454545" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

                if (!credentials?.telegramId || !credentials?.password) return null

                const existingUser = await prisma.user.findUnique({
                    where: {
                        telegramId: credentials.telegramId
                    }
                })

                if (!existingUser) {
                    throw new Error("Telegram Id belum terdaftar")
                }

                const matchingPassword = await bcrypt.compare(credentials.password, existingUser.password)

                if (!matchingPassword) {
                    throw new Error("Password tidak tepat!")
                }

                return {
                    id: `${existingUser.id}`,
                    email: existingUser.email,
                    telegramId: existingUser.telegramId
                }
            }
        })
    ],
    pages: {
        signIn: "/sign-in"
    },
    session: {
        strategy: "jwt"
    }
} satisfies NextAuthOptions

// Use it in server contexts
export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
    return getServerSession(...args, config)
}