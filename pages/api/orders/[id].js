import { getById } from "../../../utils/handlers/order"
import { getToken } from "next-auth/jwt"
import { SHA256 } from "crypto-js"

const Orders = async (req, res) => {
    const { id, ServiceID, Hash } =  req.query
    const requestMethod = req.method
    const token = getToken({req})

    const checkHashValidity = (ServiceID, OrderID, Hash) => {
        const PAYMENT_KEY = process.env.PAYMENT_KEY
        const hashFields = {
            "ServiceID": ServiceID,
            "OrderID": OrderID
        }
    
        const hash = SHA256(Object.values(hashFields).join('|') + "|" + PAYMENT_KEY).toString()

        return hash === Hash
    }

    switch(requestMethod){
        case "GET":            
            if(token?.role !== "admin" && !checkHashValidity(ServiceID, id, Hash))
                return res.status(401).end()

            const getResponse = await getById(id)
            
            if(getResponse?.error) 
                return res.status(500).send(getResponse)
            return res.status(200).send(getResponse)

        default:
            return res.status(404).end()
    }
}

export default Orders