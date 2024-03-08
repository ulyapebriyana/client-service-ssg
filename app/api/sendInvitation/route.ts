import { NextResponse } from "next/server";
import bot from "@/lib/bot";

export async function POST(req: Request, res: Response) {
    try {
        const { telegramId } = await req.json()

        const group_id = process.env.TELEGRAM_GROUP_ID as string
        const expiredDate = Math.floor(Date.now() / 1000) + (1 * 60);
        const memberLimit = 1
        const createInvitation = await bot.telegram.createChatInviteLink(group_id, {
            expire_date: expiredDate,
            member_limit: memberLimit
        })
        const invitationLink = createInvitation.invite_link
        const sendInvitation = await bot.telegram.sendMessage(telegramId, invitationLink)
        

        return NextResponse.json({
            status: 200,
            message: "invitation link send successfully",
            data: sendInvitation
        }, { status: 200 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status: 500,
            message: "internal server error"
        }, { status: 500 })
    }
}