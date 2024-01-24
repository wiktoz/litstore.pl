import { create, get } from "/utils/handlers/category"
import {NextResponse} from "next/server"
import { auth } from "/auth"

export async function GET(){
    const getResponse = await get()

    if(getResponse?.error)
        return NextResponse.json(getResponse, {status: 500})
    return NextResponse.json(getResponse, {status: 200})

}
export async function POST(req, res){
    const session = await auth(req, res)

    if(!session || session.user.role !== "admin")
        return NextResponse.json("Insufficient permission", {status:401})

    const response = await create(req.body)
            
    if(response?.error)
        return NextResponse.json(response, {status: 500})

    return NextResponse.json(response, {status: 200})
}