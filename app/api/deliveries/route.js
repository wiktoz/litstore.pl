import { get } from "/utils/handlers/delivery"
import { NextRequest } from "next/server";

export async function GET(){
    const response = await get()

    if(response?.error)
        return NextRequest.json(response, { status: 500 })
    return NextRequest.json(response, { status: 200 })
}
