"use server"

import moment from 'moment';
import prisma from "@/lib/db"

export const registerMember = async (values: any) => {
    let { name, email, telegramId, memberPeriod } = values

    switch (memberPeriod) {
        case "1":
            memberPeriod = moment().add(10, 's').toDate()
            break;
        case "3":
            memberPeriod = moment().add(90, 'd').toDate()
            break;
        case "6":
            memberPeriod = moment().add(180, 'd').toDate()
            break;
        default:
            memberPeriod = moment().add(30, 'd').toDate()
            break;
    }

    const createMember = await prisma.member.create({
        data: {
            name: name,
            email: email,
            telegramId: telegramId,
            memberPeriod: memberPeriod
        }
    })
    console.log(createMember);

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