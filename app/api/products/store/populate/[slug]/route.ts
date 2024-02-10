import Product from '@/models/product'
import Variant from "@/models/variant"
import connect from '@/utils/db/connect'
import {NextRequest, NextResponse} from "next/server";
import Item from "@/models/item";

export async function GET(req: NextRequest, context: {params: { slug: string }}){
    const { slug } =  context.params

    await connect()

    const product = await Product.findOne({slug: slug})

    if(product){
        const items = await Item.find({product_id: product._id}).populate("options")
        
        return NextResponse.json(items, {status: 200})
    }
    else return NextResponse.json({}, {status: 200})
}