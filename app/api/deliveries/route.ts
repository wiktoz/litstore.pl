import { get } from "/utils/handlers/delivery"
import {NextResponse} from "next/server"

export async function GET(){
    const response = await get()

    if(response?.error)
        return NextResponse.json(response, { status: 500 })
    return NextResponse.json(response, { status: 200 })
}
