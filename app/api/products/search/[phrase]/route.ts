import Product from '/models/product'
import connect from '/utils/db/connect'
import {NextResponse} from "next/server";

export async function GET(req, context){
    const { phrase } =  context.params
    await connect()

    return Product.find({
        $and: [ {active: true}, {
            $or: [
                {name: {$regex: phrase, '$options': 'i'}},
                {producer: {$regex: phrase, '$options': 'i'}},
            ]
        }]
    }).then(products => {
        return NextResponse.json(products, { status: 200 })
    }).catch(err => {
        return NextResponse.json(err, { status: 503 })
    })
}