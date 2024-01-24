import connect from '/utils/db/connect'
import Variant from '/models/variant'
import {NextResponse} from "next/server";

export async function GET(){
    await connect()
    const variants = await Variant.find({}).populate("options")

    return NextResponse.json(variants, {status: 200})
}