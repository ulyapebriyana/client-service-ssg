import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import moment from "moment";


export async function POST(req: Request) {
    try {
        const { userId, telegramId, price, membershipId, memberDuration, email } = await req.json()

        const token = btoa(`${process.env.SERVER_KEY}:`)

        const expireAt = moment().add(Number(memberDuration), "months")

        const existedPeriod = await prisma.transactionDetail.findFirst({
            where: {
                telegramId: telegramId as string,
                expireAt: {
                    gte: moment().format()
                }
            },
            orderBy: {
                expireAt: "desc"
            }
        })

        if (!existedPeriod) {
            const sendInvitation = await fetch(`${process.env.ROUTE_ORIGIN}/api/sendInvitation`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    telegramId: telegramId
                })
            })

            const response = await sendInvitation.json()

            console.log(response);
        } else {
            const deActive = await prisma.transactionDetail.updateMany({
                where: {
                    telegramId: telegramId as string
                },
                data: {
                    isActive: false
                },
            })
        }

        const remainPeriod = existedPeriod?.expireAt

        let newExpireAt = moment(expireAt); // Buat salinan expireAt

        if (remainPeriod) {
            const diff = moment(remainPeriod).diff(moment(), 'milliseconds'); // Hitung selisih waktu dalam milidetik
            newExpireAt.add(diff); // Tambahkan selisih waktu ke expireAt
        }

        const transaction = await prisma.transaction.create({
            data: {
                userId: userId as string,
                membershipId: membershipId as string,
                transactionDetail: {
                    create: {
                        telegramId: telegramId as string,
                        price: BigInt(price as string),
                        expireAt: newExpireAt.format()
                    }
                }
            },
            include: {
                transactionDetail: true
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
                    gross_amount: Number(transaction.transactionDetail?.price)
                },
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