import connect from '@/utils/db/connect'
import User from '@/models/user'
import hashPassword from "@/utils/hashPassword";
import {NextRequest, NextResponse} from "next/server"

export async function POST(req:NextRequest){
    const body = await req.json()

    if(!body.email)
        return NextResponse.json({error: "Email cannot be empty!"}, {status:200})
    if(body.password.length < 7)
        return NextResponse.json({error: "Password has to be at least 8 characters!"},{status:200})

    await connect()
    const user = await User.findOne({email: body.email})

    if(user){
        return NextResponse.json({error: "User with this email already exists!"},{status:200})
    }


    //create new user
    const hash = hashPassword(body.password)

    const newUser = new User({
        email: body.email,
        password: hash
    })
    
    await newUser.save()

    return NextResponse.json({message: "Registered successfully"},{status:200})
}