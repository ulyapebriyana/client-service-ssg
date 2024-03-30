// import { NextRequest, NextResponse } from "next/server";
// import moment from 'moment';
// import prisma from "@/lib/db";

// export async function POST(req: NextRequest, res: NextResponse) {
//     let { name, email, telegramId, memberPeriod } = await req.json()
//     const text = "hello world"
//     const chatId = -4109977850
//     switch (memberPeriod) {
//         case 1:
//             memberPeriod = moment().add(10, 's').toDate()
//             break;
//         case 2:
//             memberPeriod = moment().add(90, 'd').toDate()
//             break;
//         case 3:
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

//     return NextResponse.json({
//         status: 200,
//         message: "member created succesfully",
//         data: createMember
//     }, {
//         status: 200
//     })
// } 

export async function GET(req: Request, res: Response) {
    return Response.json({message: "helloo"})
}