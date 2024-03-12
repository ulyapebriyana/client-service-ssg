import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { order_id, gross_amount } = await req.json()
        const token = btoa(`${process.env.SERVER_KEY}:`)
        const requestToken = await fetch("https://app.sandbox.midtrans.com/snap/v1/transactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${token}`
            },
            body: JSON.stringify({
                transaction_details: {
                    order_id: order_id,
                    gross_amount: gross_amount
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