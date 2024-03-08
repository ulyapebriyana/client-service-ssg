import { NextResponse } from "next/server";
import bot from "@/lib/bot";
import prisma from "@/lib/db";

export async function GET() {
    try {
        const currentDate = new Date()
        const members = await prisma.member.findMany({
            where: {
                memberPeriod: {
                    lte: currentDate
                }
            }
        })

        await Promise.all(members.map(async (member) => {
            const group_id = process.env.TELEGRAM_GROUP_ID as string
            const userIdTelegram = parseInt(member.telegramId)
            await bot.telegram.banChatMember(group_id, userIdTelegram)
            await prisma.member.delete({
                where: {
                    id: member.id
                }
            })
        }))

        return NextResponse.json({
            status: 200,
            message: "get experied period success",
            data: members
        })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status: 500,
            message: "internal server error",
        }, { status: 500 })
    }
}