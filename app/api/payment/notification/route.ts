import { NextResponse } from "next/server";

export async function POST(request: Request, response: Response) {
    try {
        const data = await request.json()
        return NextResponse.json({
            status: "success",
            message: "ok",
            data: data
        }, { status: 200 })
    } catch (error) {
        console.log(error);

        return NextResponse.json({
            status: 500,
            message: "internal server error"
        })
    }
}