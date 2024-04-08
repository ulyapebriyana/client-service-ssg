import { NextResponse } from "next/server";
import bot from "@/lib/bot";
import prisma from "@/lib/db";
import moment from "moment";

export async function GET(req: Request, res: Response) {

    try {
        if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
            return Response.json({
                status: 401,
                message: "Unautorized"
            }, { status: 401 })
        }

        const currentDate = moment().format()
        const members = await prisma.memberDetail.findMany({
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

            const dataMember = await prisma.memberDetail.delete({
                where: {
                    id: member.id
                }
            })
        }))

        // const serializedMembers = members.map(({ price, ...rest }) => ({
        //     ...rest,
        //     price: price.toString(),
        // }));

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