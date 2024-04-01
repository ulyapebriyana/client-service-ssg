import { NextResponse } from "next/server";
import bot from "@/lib/bot";
import prisma from "@/lib/db";

export async function GET() {
    try {
        const currentDate = new Date()
        const members = await prisma.transactionDetail.findMany({
            where: {
                expireAt: {
                    lte: currentDate
                },
                isActive: true
            },
            distinct: ["telegramId"]
        })

        console.log(members);


        await Promise.all(members.map(async (member) => {
            const group_id = process.env.TELEGRAM_GROUP_ID as string
            const userIdTelegram = parseInt(member.telegramId)

            try {
                const existedMember = await bot.telegram.banChatMember(group_id, userIdTelegram)
            } catch (error) {
                const telegramIdAdmin = "5449821599"
                const sendMessageToAdmin = await bot.telegram.sendMessage(telegramIdAdmin, `User dengan telegramId ${userIdTelegram}, telah meninggalkan group`)
            }

            const dataMember = await prisma.transactionDetail.update({
                where: {
                    id: member.id
                },
                data: {
                    isActive: false
                }
            })
        }))

        const serializedMembers = members.map(({ price, ...rest }) => ({
            ...rest,
            price: price.toString(),
        }));

        return NextResponse.json({
            status: 200,
            message: "get experied period success",
            data: serializedMembers
        })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status: 500,
            message: "internal server error",
        }, { status: 500 })
    }
}