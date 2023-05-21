import generateToken from '../../utils/generateToken'
import { create } from '../../utils/handlers/token'
import { getByEmail } from "../../utils/handlers/user"
import { getToken } from "next-auth/jwt"
import mail from '../../utils/nodemailer'

const ResetPassword = async (req, res) => {
    const requestMethod = req.method
    const token = await getToken({req})

    switch(requestMethod){
        case "POST":
            /*
            * Return if user is logged in
            * */
            if(token)
                return res.status(401)

            const email = req.body.email
            const user = await getByEmail(email)

            if(user?.error)
                return res.status(200).send(user)

            const resetToken = await generateToken()

            const createToken = create({
                userId: user._id,
                token: resetToken
            })

            if(createToken?.error)
                return res.status(200).send(createToken)

            const link = "http://localhost:3000/auth/change_password/id/"+user._id+"/token/"+resetToken
            const html = "Link to reset your password: " + link

            const sendMail = await mail("LitStore.pl", email, "Reset Password", html)
            return res.status(200).send(createToken)

        default:
            return res.status(404).end()
    }
}

export default ResetPassword