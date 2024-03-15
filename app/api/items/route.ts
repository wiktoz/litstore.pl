import Item from "@/models/item"
import connect from '@/utils/db/connect'
import {NextRequest, NextResponse} from "next/server";

export async function GET(){
    await connect()

    return await Item.find({}).then((product)=>{
        return NextResponse.json(product, {status:200})
    }).catch((err)=>{
        return NextResponse.json(err, {status:500})
    })  
}

export async function POST(req:NextRequest) {
    await connect()

    const body = await req.json()

    return await Item.create(body).then((product)=>{
        return NextResponse.json(product, {status:200})
    }).catch((err)=>{
        return NextResponse.json(err, {status:500})
    })
}