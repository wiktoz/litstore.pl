import {NextRequest, NextResponse} from "next/server";
import {getById} from "@/utils/handlers/order";

export async function GET(req:NextRequest, context: { params: {id:string}}){
    const {id} = context.params
    const response = await getById(id)

    return NextResponse.json(response, {status:200})
}