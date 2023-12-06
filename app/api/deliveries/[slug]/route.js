import { getBySlug } from "../../../../utils/handlers/delivery"
import {NextResponse} from "next/server";

export async function GET(req, context){
    const { slug } =  context.params
    const getResponse = await getBySlug(slug)
            
    if(getResponse?.error)
        return NextResponse.json(getResponse, {status:500})
    return NextResponse.json(getResponse, {status:200})
}
