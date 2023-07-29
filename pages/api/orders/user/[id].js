import { getByUserId } from "../../../../utils/handlers/order"
import { getToken } from "next-auth/jwt"

const UserOrders = async (req, res) => {
    const { id } =  req.query
    const requestMethod = req.method
    const token = await getToken({req})

    switch(requestMethod){
        case "GET":
            if(!token?.id)
                return res.status(401).end()

            const getResponse = await getByUserId(id)

            if(getResponse?.error)
                return res.status(500).send(getResponse)
            return res.status(200).send(getResponse)

        default:
            return res.status(404).end()
    }
}

export default UserOrders