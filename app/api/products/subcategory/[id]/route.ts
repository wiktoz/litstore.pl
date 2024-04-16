import Product from "@/models/product"
import connect from '@/utils/db/connect'
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest, context: { params: {id: string} }){
    const { id } =  context.params

    await connect()

    return await Product.find({subcategory: id, active: true}).then((products)=>{
        return NextResponse.json(products, {status: 200})
    }).catch((err)=>{
        return NextResponse.json(err, {status: 503})
    })  
}