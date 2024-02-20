import {NextRequest, NextResponse} from "next/server"
import {getById} from "@/utils/handlers/product"

export async function GET(req: NextRequest, context: { params: {id: string} }){
    const {id} = context.params
    const res = await getById(id)

    return NextResponse.json(res, {status: 200})
}