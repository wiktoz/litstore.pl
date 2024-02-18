import ProductItem from "@/models/item"
import Product from '@/models/product'
import Variant from '@/models/variant'
import connect from '@/utils/db/connect'
import {NextResponse} from "next/server";

export async function GET(context: { params: { slug: string } }) {
    const { slug } = context.params

    await connect()

    await ProductItem.find({product_id: slug}).populate([
        {
            path: 'product_id'
        },
        {
            path: 'options',
            populate:{
                path: 'variant_id'
            }
        }
    ]).then((product)=>{
        return NextResponse.json(product, {status: 200})
    }).catch((err)=>{
        return NextResponse.json(err, {status: 503})
    })  
}