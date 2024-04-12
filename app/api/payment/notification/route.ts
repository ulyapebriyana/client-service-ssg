import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import moment from "moment";

export async function POST(request: Request, response: Response) {
    try {
        const data = await request.json()

        let transactionId = data.order_id;
        let transactionStatus = data.transaction_status;
        let fraudStatus = data.fraud_status;



        if (transactionStatus == 'capture') {
            if (fraudStatus == 'accept') {
                // TODO set transaction status on your database to 'success'
                // and response with 200 OK
                const getTransaction = await prisma.transaction.findFirst({
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

                const telegramId = getTransaction?.user.telegramId
                const duration = getTransaction?.membershipPlanning.duration

                const expireAt = moment().add(Number(duration), "months")

                const existedPeriod = await prisma.memberDetail.findFirst({
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

                const remainPeriod = existedPeriod?.expireAt

                let newExpireAt = moment(expireAt); // Buat salinan expireAt

                if (remainPeriod) {
                    const diff = moment(remainPeriod).diff(moment(), 'milliseconds'); // Hitung selisih waktu dalam milidetik
                    newExpireAt.add(diff); // Tambahkan selisih waktu ke expireAt
                }

                if (existedPeriod) {
                    const deActive = await prisma.memberDetail.updateMany({
                        where: {
                            telegramId: telegramId as string
                        },
                        data: {
                            isActive: false
                        },
                    })
                } else {
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
                }

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
                        expireAt: newExpireAt.format()

                    }
                })

            }
        } else if (transactionStatus == 'settlement') {
            // TODO set transaction status on your database to 'success'
            // and response with 200 OK
            const getTransaction = await prisma.transaction.findFirst({
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

            const telegramId = getTransaction?.user.telegramId
            const duration = getTransaction?.membershipPlanning.duration

            const expireAt = moment().add(Number(duration), "months")

            const existedPeriod = await prisma.memberDetail.findFirst({
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

            const remainPeriod = existedPeriod?.expireAt

            let newExpireAt = moment(expireAt); // Buat salinan expireAt

            if (remainPeriod) {
                const diff = moment(remainPeriod).diff(moment(), 'milliseconds'); // Hitung selisih waktu dalam milidetik
                newExpireAt.add(diff); // Tambahkan selisih waktu ke expireAt
            }

            if (existedPeriod) {
                const deActive = await prisma.memberDetail.updateMany({
                    where: {
                        telegramId: telegramId as string
                    },
                    data: {
                        isActive: false
                    },
                })
            } else {
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
            }

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
                    expireAt: newExpireAt.format()

                }
            })


        } else if (transactionStatus == 'cancel' ||
            transactionStatus == 'deny' ||
            transactionStatus == 'expire') {
            // TODO set transaction status on your database to 'failure'
            // and response with 200 OK
            const transactionUpdated = await prisma.transaction.update({
                where: {
                    id: transactionId
                },
                data: {
                    status: "CANCEL"
                }
            })
        } else if (transactionStatus == 'pending') {
            // TODO set transaction status on your database to 'pending' / waiting payment
            // and response with 200 OK
        }

        return NextResponse.json({
            status: "success",
            message: "ok",
        }, { status: 200 })
    } catch (error) {
        console.log(error);

        return NextResponse.json({
            status: 500,
            message: "internal server error"
        })
    }
}

//redeploy again