import { getBySlug } from "@/utils/handlers/category"
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest, context: { params: {slug: string} }){
    const { slug } =  context.params

    const response = await getBySlug(slug)

    return NextResponse.json(response, {status: 200})
}