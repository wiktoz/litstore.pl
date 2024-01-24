import Product from "/models/product"
import connect from '/utils/db/connect'
import Variant from "/models/variant"
import VariantOption from "/models/variant_option"
import {NextResponse} from "next/server";

export async function GET(req, context){
    const { slug } =  context.params

    await connect()

    return await Product.findOne({slug: slug}).populate({
        path: 'variant',
        model: 'Variant',
        populate: {
            path: 'options',
            model: 'VariantOption'
        }
    }).then((product)=>{
        return NextResponse.json(product, {status: 200})
    }).catch((err)=>{
        return NextResponse.json(err, {status: 200})
    })  
}
