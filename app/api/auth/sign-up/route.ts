import { NextResponse } from "next/server";
import bot from "@/lib/bot";
import { registerSchema } from "@/schema";
import bcrypt from "bcrypt"
import prisma from "@/lib/db"


export async function POST(req: Request, res: Response) {
    try {
        const zodValidated = registerSchema.safeParse(await req.json())
        if (!zodValidated.success) {
            const messages: Array<string> = []
            zodValidated.error.issues.map((error) => {
                messages.push(error.message)
            })
            return NextResponse.json({
                status: 422,
                message: messages
            }, {
                status: 422
            })
        }

        const { name, email, telegramId, password } = zodValidated.data

        const existedTelegramId = await prisma.user.findUnique({
            where: {
                telegramId: telegramId
            }
        })

        if (existedTelegramId) return NextResponse.json({
            status: 422,
            message: "user already exist"
        }, { status: 422 })

        try {
            await bot.telegram.sendMessage(telegramId, "trimakasih telah melakukan registrasi")
        } catch (error: any) {
            // console.log(error.response);
            return NextResponse.json({
                status: 400,
                message: "bad request"
            }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                telegramId: telegramId,
                password: hashedPassword
            }
        })

        return NextResponse.json({
            status: 201,
            message: "user created successfully",
            data: user
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status: 500,
            message: "internal server error"
        })
    }
}