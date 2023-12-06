import { getByUserId } from "../../../../../utils/handlers/order"
import { auth } from "/auth"
import {NextResponse} from "next/server";

export async function GET(req, context){
    const session = await auth(req)
    const { id } =  context.params

    if(!session)
        return NextResponse.json({}, {status: 401})

    const getResponse = await getByUserId(id)

    if(getResponse?.error)
        return NextResponse.json(getResponse, {status:500})
    return NextResponse.json(getResponse, {status:200})
}
