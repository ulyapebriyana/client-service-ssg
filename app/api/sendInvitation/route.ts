import { NextResponse } from "next/server";
import bot from "@/lib/bot";

export async function GET() {
    const group_id = process.env.TELEGRAM_GROUP_ID as string
    const expiredDate = Math.floor(Date.now() / 1000) + (1 * 60);
    const memberLimit = 1
    const data = await bot.telegram.createChatInviteLink(group_id, {
        expire_date: expiredDate,
        member_limit: memberLimit
    })
    return NextResponse.json({
        status: 200,
        message: "invitation created successfully",
        data: data
    }, {
        status: 200
    })
}