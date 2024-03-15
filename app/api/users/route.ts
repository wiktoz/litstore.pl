import connect from '@/utils/db/connect'
import User from '@/models/user'
import {NextResponse} from "next/server";

export async function GET(){
    await connect()
    const users = await User.find({})

    return NextResponse.json(users, {status: 200})
}