import {isValid, remove} from "@/utils/handlers/token"
import { changePassword } from "@/utils/handlers/user"
import hashPassword from "@/utils/hashPassword"
import {NextRequest, NextResponse} from "next/server"

export async function POST (req: NextRequest, context: { params: {id: string, token: string} }){
    const { id, token } =  context.params
    const body = await req.json()
    const password = body.password

    const isTokenValid = await isValid(id, token)

    if (isTokenValid?.error)
        return NextResponse.json(isTokenValid, { status: 200 })

    if (!isTokenValid.valid)
        return NextResponse.json(isTokenValid, { status: 200 })

    const hash = hashPassword(password)
    const updatePassword = await changePassword(id, hash)
    const removeToken = await remove(id, token)

    if(!updatePassword || !removeToken)
        return NextResponse.json({message: "Cannot update password"}, {status:200})

    return NextResponse.json({message: "Password successfully updated"}, { status: 200 })
}
