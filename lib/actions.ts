"use server"

import { registerSchema } from "@/schema"
import { z } from "zod"
import { redirect } from 'next/navigation';
import prisma from "./db";
import moment from "moment"
import { auth } from "./auth";

export const createTransactionDetails = async (formData: FormData) => {
    const session = await auth()
    if (!session) {
        return redirect("/sign-in")
    }
    const rawFormData = Object.fromEntries(formData)
    const { userId, telegramId, membershipId, price, memberDuration } = rawFormData
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
        }
    })
    console.log(transaction);


}

export const signUp = async (prevState: any, values: z.infer<typeof registerSchema>) => {
    const { name, email, telegramId, password, passwordConfirmation } = values


    const req = await fetch(`${process.env.ROUTE_ORIGIN}/api/auth/sign-up`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email,
            telegramId: telegramId,
            password: password,
            passwordConfirmation: passwordConfirmation
        })
    })

    const res = await req.json()

    if (res.status === 400) {
        return {
            message: "Telegram Id tidak ditemukan, hubungi chatbot kami!"
        }
    } else if (res.status === 422) {
        return {
            message: "Telegram Id sudah terdaftar, silahkan login kembali"
        }
    } else if (res.status === 201) {
        return redirect("/sign-in")
    } else {
        return {
            message: "Server internal kami sedang error"
        }
    }
}


// export const registerMember = async (values: any) => {
//     let { name, email, telegramId, memberPeriod } = values

//     switch (memberPeriod) {
//         case "1":
//             memberPeriod = moment().add(10, 's').toDate()
//             break;
//         case "3":
//             memberPeriod = moment().add(90, 'd').toDate()
//             break;
//         case "6":
//             memberPeriod = moment().add(180, 'd').toDate()
//             break;
//         default:
//             memberPeriod = moment().add(30, 'd').toDate()
//             break;
//     }

//     const createMember = await prisma.member.create({
//         data: {
//             name: name,
//             email: email,
//             telegramId: telegramId,
//             memberPeriod: memberPeriod
//         }
//     })
//     console.log(createMember);

//     const sendInvitation = await fetch(`${process.env.ROUTE_ORIGIN}/api/sendInvitation`, {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             telegramId: telegramId
//         })
//     })

//     const response = await sendInvitation.json()

//     console.log(response);


// }