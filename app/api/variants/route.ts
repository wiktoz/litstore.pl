import connect from '@/utils/db/connect'
import Variant from '@/models/variant'
import {NextRequest, NextResponse} from "next/server";
import VariantOption from "@/models/variant_option";

export async function GET(){
    await connect()
    const variants = await Variant.find({}).populate('options')

    return NextResponse.json(variants, {status: 200})
}

export async function POST(req:NextRequest) {
    await connect()

    const body = await req.json()

    const variantOptions = body.options.map((opt:string) => {
        return { name: opt }
    })

    const options = await VariantOption.insertMany(variantOptions)
        .then((opts) => {
            return opts.map(opt => {
                return opt._id
            })
        })

    const variant = {
        name: body.name,
        display_name: body.display_name,
        select_option: body.select_option,
        options: options
    }

    return await Variant.create(variant).then((product)=>{
        return NextResponse.json(product, {status:200})
    }).catch((err)=>{
        return NextResponse.json(err, {status:500})
    })
}