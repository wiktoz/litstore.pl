import Product from "@/models/product"
import connect from '@/utils/db/connect'
import Variant from "@/models/variant"
import VariantOption from "@/models/variant_option"
import {NextRequest, NextResponse} from "next/server"

export async function GET(req: NextRequest, context: {params : {slug: string}}){
    const { slug } =  context.params

    await connect()

    return Product.findOne({slug: slug}).then((product)=>{
        return NextResponse.json(product, {status: 200})
    }).catch((err)=>{
        return NextResponse.json(err, {status: 200})
    })  
}
