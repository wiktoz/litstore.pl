import Item from "@/models/item"
import Product from '@/models/product'
import Variant from '@/models/variant'
import connect from '@/utils/db/connect'
import {NextRequest, NextResponse} from "next/server"

export async function GET(req:NextRequest, context: { params: { slug: string } }) {
    const { slug } = context.params

    await connect()

    return await Item.find({product_id: slug}).then((product)=>{
        return NextResponse.json(product, {status: 200})
    }).catch((err)=>{
        return NextResponse.json(err, {status: 503})
    })  
}