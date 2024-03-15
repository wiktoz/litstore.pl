import User from "@/models/user"
import connect from "@/utils/db/connect"
import {NextRequest, NextResponse} from "next/server"

export async function GET(req:NextRequest, context: { params: { id: string } }){
    await connect()

    const { id } = context.params

    return await User.findOne({_id: id}, { password: 0, role: 0 })
    .then((user:UserInterface) => {
        return NextResponse.json(user, {status:200})
    })
    .catch(err => {
        return NextResponse.json(err, {status:503})
    })
}
