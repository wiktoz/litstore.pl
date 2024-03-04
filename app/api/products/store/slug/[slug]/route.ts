import Item from "@/models/item"
import Product from '@/models/product'
import connect from '@/utils/db/connect'
import {NextRequest, NextResponse} from "next/server";

const ProductStore = async (req: NextRequest, context: { params: {slug: string} }) => {
    const { slug } = context.params

    await connect()

    const product = await Product.findOne({slug: slug})

    if(product){
        await Item.find({product_id: product._id})
        .then((product)=>{
            return NextResponse.json(product, {status: 200})
        }).catch((err)=>{
            return NextResponse.json(err, {status: 200})
        })
    }
    else return NextResponse.json({}, {status: 200})
}

export default ProductStore