import generateToken from '@/utils/generateToken'
import { create } from '@/utils/handlers/token'
import { getByEmail } from "@/utils/handlers/user"
import mail from '@/utils/nodemailer'
import {NextRequest, NextResponse} from "next/server"

export async function POST(req: NextRequest){
    const body = await req.json()
    const email = body.email
    const user = await getByEmail(email)

    if(user?.error)
        return NextResponse.json({error: true, message: "User not found."}, { status: 200 })

    const resetToken = await generateToken()

    const createToken = create({
        userId: user._id,
        token: resetToken
    })

    if(createToken?.error)
        return NextResponse.json({error: true, message: "Cannot create token."}, { status: 200 })

    const link = process.env.PAGE_LINK + "/auth/password/change/id/"+user._id+"/token/"+resetToken
    const html = "Link to reset your password: " + link

    const sendMail = await mail("LitStore.pl", email, "Reset Password", html)

    return NextResponse.json({message: "Token created."}, { status: 200 })
}