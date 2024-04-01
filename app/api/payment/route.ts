import { NextResponse } from "next/server";
import prisma from "@/lib/db";


export async function POST(req: Request) {
    try {
        const { userId, telegramId, price, membershipPlanningId, memberDuration, email } = await req.json()
        console.log(membershipPlanningId);
        

        const token = btoa(`${process.env.SERVER_KEY}:`)

        const transaction = await prisma.transaction.create({
            data: {
                userId: userId,
                membershipPlanningId: membershipPlanningId,
                price: price,
            }
        })

        
        const requestToken = await fetch("https://app.sandbox.midtrans.com/snap/v1/transactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${token}`
            },
            body: JSON.stringify({
                transaction_details: {
                    order_id: transaction.id,
                    gross_amount: Number(transaction.price)
                },
                customer_details: {
                    email: email
                }
            })
        })
        const data = await requestToken.json()

        return NextResponse.json({ data })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status: 500,
            message: "internal server error"
        }, { status: 500 })
    }
}