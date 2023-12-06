import Product from '../../../models/product'
import connect from '../../../utils/db/connect'

import { NextRequest, NextResponse } from "next/server"

export async function GET (request){
    await connect()
    
    const res = await Product.find({active: true})

    return NextResponse.json(res, {
        status: 200,
    })
}