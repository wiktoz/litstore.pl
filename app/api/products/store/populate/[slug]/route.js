import ProductItem from "/models/product_item"
import Product from '/models/product'
import Variant_option from "/models/variant_option"
import Variant from "/models/variant"
import connect from '/utils/db/connect'
import {NextResponse} from "next/server";

export async function GET(req, context){
    const { slug } =  context.params

    await connect()

    const product = await Product.findOne({slug: slug})

    if(product){
        const items = await ProductItem.find({product_id: product._id}).populate("options")
        
        return NextResponse.json(items, {status: 200})
    }
    else return NextResponse.json({}, {status: 200})
}