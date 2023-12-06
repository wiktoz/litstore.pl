import ProductItem from "/models/product_item"
import Product from '/models/product'
import Variant from '/models/variant'
import connect from '/utils/db/connect'
import {NextResponse} from "next/server";

export async function GET(req, context){
    const { id } = context.params

    await connect()

    return await ProductItem.findOne({_id: id}).populate([
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