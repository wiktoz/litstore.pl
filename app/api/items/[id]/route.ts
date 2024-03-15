import Item from "@/models/item"
import Product from '@/models/product'
import Variant from '@/models/variant'
import VariantOption from '@/models/variant_option'
import connect from '@/utils/db/connect'
import {NextResponse, NextRequest} from "next/server";

export async function GET(req: NextRequest, context: { params: {id: string} }){
    const { id } = context.params

    await connect()

    return await Item.findOne({_id: id}).populate({
        path: "options.option_id",
        model: VariantOption
    }).populate({
        path: "options.variant_id",
        model: Variant
    }).then((product)=>{
        return NextResponse.json(product, {status: 200})
    }).catch((err)=>{
        return NextResponse.json(err, {status: 503})
    })  
}