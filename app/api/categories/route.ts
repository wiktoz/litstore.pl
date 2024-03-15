import { create, get } from "@/utils/handlers/category"
import {NextRequest, NextResponse} from "next/server"
import { auth } from "@/auth"

export async function GET(){
    const response = await get()

    return NextResponse.json(response, {status: 200})
}
export async function POST(req:NextRequest){
    const session = await auth()
    const body = await req.json()

    if(!session)
        return NextResponse.json("Insufficient permission", {status:401})


    const response = await create(body)

    return NextResponse.json(response, {status: 200})
}