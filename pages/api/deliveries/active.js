import { getActive } from "../../../utils/handlers/delivery"

const Deliveries = async (req, res) => {
    const requestMethod = req.method

    switch(requestMethod){
        case "GET":
            const getResponse = await getActive()
            
            if(getResponse?.error) 
                return res.status(500).send(getResponse)
            return res.status(200).send(getResponse)

        default:
            return res.status(404).end()
    }
}

export default Deliveries