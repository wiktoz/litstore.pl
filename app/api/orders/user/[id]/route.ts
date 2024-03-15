import { getByUserId } from "@/utils/handlers/order"
import { auth } from "@/auth"
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest, context: { params: {id: string} }){
    const session = await auth()
    const { id } =  context.params

    if(!session)
        return NextResponse.json({}, {status: 403})

    const response = await getByUserId(id)

    return NextResponse.json(response, {status:200})
}
