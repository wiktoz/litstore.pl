import { get } from "@/utils/handlers/order"
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest){
    const page = Number(req.nextUrl.searchParams.get('page'))
    const limit = Number(req.nextUrl.searchParams.get('limit'))

    const response = await get(page, limit)

    return NextResponse.json(response, {status:200})
}
