import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import moment from "moment";

export async function POST(request: Request, response: Response) {
    try {
        const data = await request.json()

        let transactionId = data.order_id;
        let transactionStatus = data.transaction_status;
        let fraudStatus = data.fraud_status;

        const getUser = await prisma.transaction.findFirst({
            where: {
                id: transactionId
            },
            select: {
                user: {
                    select: {
                        telegramId: true
                    }
                },
                membershipPlanning: {
                    select: {
                        duration: true
                    }
                }
            },
        })

        const telegramId = getUser?.user.telegramId
        const duration = getUser?.membershipPlanning.duration

        if (transactionStatus == 'capture') {
            if (fraudStatus == 'accept') {
                // TODO set transaction status on your database to 'success'
                // and response with 200 OK
                const transactionUpdated = await prisma.transaction.update({
                    where: {
                        id: transactionId
                    },
                    data: {
                        status: "SUCCESS"
                    }
                })

                const newMember = await prisma.memberDetail.create({
                    data: {
                        transactionId: transactionId,
                        telegramId: telegramId as string,
                        expireAt: moment().add(duration, "M").format()

                    }
                })

            }
        } else if (transactionStatus == 'settlement') {
            // TODO set transaction status on your database to 'success'
            // and response with 200 OK
            const transactionUpdated = await prisma.transaction.update({
                where: {
                    id: transactionId
                },
                data: {
                    status: "SUCCESS"
                }
            })

            const newMember = await prisma.memberDetail.create({
                data: {
                    transactionId: transactionId,
                    telegramId: telegramId as string,
                    expireAt: moment().add(duration, "M").format()

                }
            })

        } else if (transactionStatus == 'cancel' ||
            transactionStatus == 'deny' ||
            transactionStatus == 'expire') {
            // TODO set transaction status on your database to 'failure'
            // and response with 200 OK
        } else if (transactionStatus == 'pending') {
            // TODO set transaction status on your database to 'pending' / waiting payment
            // and response with 200 OK
        }

        return NextResponse.json({
            status: "success",
            message: "ok",
            data: getUser
        }, { status: 200 })
    } catch (error) {
        console.log(error);

        return NextResponse.json({
            status: 500,
            message: "internal server error"
        })
    }
}

//redeploy