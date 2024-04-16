import connect from '@/utils/db/connect'
import User from '@/models/user'
import {NextRequest, NextResponse} from "next/server"
import bcrypt from "bcryptjs";

export async function POST(req:NextRequest){
    const body = await req.json()

    if(!body.email)
        return NextResponse.json({success: false, error: "Incorrect credentials"}, {status:200})

    if(!body.password)
        return NextResponse.json({success: false, error: "Incorrect credentials"}, {status:200})

    await connect()
    const user = await User.findOne({email: body.email})

    if(!user)
        return NextResponse.json({success: false, error: "Incorrect credentials"},{status:200})


    const comparison = await bcrypt.compare(body.password, user.password)

    if(!comparison)
        return NextResponse.json({success: false, error: "Incorrect credentials"},{status:200})

    return NextResponse.json({success: true, user: user},{status:200})
}