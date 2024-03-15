import connect from "@/utils/db/connect";
import Variant from "@/models/variant";
import VariantOption from "@/models/variant_option";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req:NextRequest, context: { params: {id: string}}){
    const { id } = context.params

    await connect()
    const variants = await Variant.find({_id: id}).populate({
            path: "options",
            model: VariantOption
    })

    return NextResponse.json(variants, {status: 200})
}