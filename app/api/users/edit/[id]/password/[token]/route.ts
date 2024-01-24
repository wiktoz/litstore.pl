import {isValid, remove} from "/utils/handlers/token"
import { changePassword } from "/utils/handlers/user"
import hashPassword from "/utils/hashPassword"
import {NextResponse} from "next/server"

export async function POST (req, context){
    const { id, token } =  context.params
    const body = await req.json()
    const password = body.password

    const isTokenValid = await isValid(id, token)

    if (isTokenValid?.error)
        return NextResponse.json(isTokenValid, { status: 200 })

    if (!isTokenValid.valid)
        return NextResponse.json(isTokenValid, { status: 200 })

    const hash = await hashPassword(password)
    const updatePassword = await changePassword(id, hash)

    if (updatePassword?.error)
        return NextResponse.json(updatePassword, { status: 200 })

    const removeToken = await remove(id, token)

    if (removeToken?.error)
        return NextResponse.json(removeToken, { status: 200 })

    return NextResponse.json({message: "Password successfully updated"}, { status: 200 })
}
