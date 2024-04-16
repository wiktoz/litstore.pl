import Item from "@/models/item"
import Product from '@/models/product'
import Variant from '@/models/variant'
import connect from '@/utils/db/connect'
import {NextRequest, NextResponse} from "next/server"
import {getById} from "@/utils/handlers/product";

export async function GET(req:NextRequest, context: { params: { slug: string } }) {
    const { slug } = context.params

    await connect()

    const product = await getById(slug)

    return await Item.find({product_id: product._id}).populate({
        path: 'options',
        populate: [
            { path: 'option_id' },
            { path: 'variant_id' }
        ]
    })
    .then((product)=>{
        return NextResponse.json(product, {status: 200})
    }).catch((err)=>{
        return NextResponse.json(err, {status: 503})
    })
}