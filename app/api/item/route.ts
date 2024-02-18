import ProductItem from "@/models/item"
import connect from '@/utils/db/connect'
import {NextResponse} from "next/server";

export async function GET(){
    await connect()

    return await ProductItem.find({}).then((product)=>{
        return NextResponse.json(product, {status:200})
    }).catch((err)=>{
        return NextResponse.json(err, {status:500})
    })  
}