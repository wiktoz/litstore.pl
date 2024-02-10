import { NextResponse } from "next/server"
import { get } from "@/utils/handlers/product"

export async function GET(){
    const res = await get()

    return NextResponse.json(res, {status: 200})
}