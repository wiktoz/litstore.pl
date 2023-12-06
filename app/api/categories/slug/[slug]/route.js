import { getBySlug } from "/utils/handlers/category"
import {NextResponse} from "next/server";

export async function GET(req, context){
    const { slug } =  context.params

    const response = await getBySlug(slug)
            
    if(response?.error)
        return NextResponse.json(response, {status: 500})

    return NextResponse.json(response, {status: 200})
}