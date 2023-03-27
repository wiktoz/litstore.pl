import { getById } from "../../../utils/handlers/order"

const Orders = async (req, res) => {
    const { id } =  req.query
    const requestMethod = req.method

    switch(requestMethod){
        case "GET":
            const getResponse = await getById(id)
            
            if(getResponse?.error) 
                return res.status(500).send(getResponse)
            return res.status(200).send(getResponse)

        default:
            return res.status(404).end()
    }
}

export default Orders