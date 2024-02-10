import { get } from "@/utils/handlers/order"
import {NextResponse} from "next/server";

export async function GET(){
    const response = await get()

    return NextResponse.json(response, {status:200})
}
