import {isValid, remove} from "../../../../../../utils/handlers/token"
import { changePassword } from "../../../../../../utils/handlers/user"
import hashPassword from "../../../../../../utils/hashPassword"

const ChangePassword = async (req, res) => {
    const { id, token } =  req.query
    const password = req.body.password
    const requestMethod = req.method

    switch(requestMethod) {
        case "POST":
            const isTokenValid = await isValid(id, token)

            if (isTokenValid?.error)
                return res.status(200).send(isTokenValid)

            if (!isTokenValid.valid)
                return res.status(200).send(isTokenValid)

            const hash = await hashPassword(password)
            const updatePassword = await changePassword(id, hash)

            if (updatePassword?.error)
                return res.status(200).send(updatePassword)

            const removeToken = await remove(id, token)

            if (removeToken?.error)
                return res.status(200).send(removeToken)

            return res.status(200).send({message: "Password successfully updated"})

        default:
            return res.status(404).end()
    }
}

export default ChangePassword