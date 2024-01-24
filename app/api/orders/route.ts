import { get } from "/utils/handlers/order"
import {NextResponse} from "next/server";

export async function GET(req){
    const getResponse = await get()

    if(getResponse?.error)
        return NextResponse.json(getResponse, {status:500})
    return NextResponse.json(getResponse, {status:200})
}
