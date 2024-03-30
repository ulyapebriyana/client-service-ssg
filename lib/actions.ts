"use server"

import { registerSchema } from "@/schema"
import { z } from "zod"
import { redirect } from 'next/navigation';

export const signInResponse = async(response: any) => {
    console.log(response);
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

    console.log(res);


    if (res.status === 400) {
        return {
            message: "Telegram Id tidak ditemukan, hubungi chatbot kami!"
        }
    } else if (res.status === 422) {
        return {
            message: "Telegram Id sudah terdaftar, silahkan login kembali"
        }
    } else if (res.status === 201) {
        return redirect("/")
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