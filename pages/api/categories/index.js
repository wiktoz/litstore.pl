import { create, get } from "../../../utils/handlers/category"
import { getToken } from "next-auth/jwt"

const Categories = async (req, res) => {
    const requestMethod = req.method
    const token = await getToken({req})

    switch(requestMethod){
        case "POST":
            if(!token)
                return res.status(401)
            
            if(token?.role !== "admin")
                return res.status(401).end()

            const postResponse = await create(req.body)
            
            if(postResponse?.error) 
                return res.status(500).send(postResponse)
            return res.status(200).send(postResponse)

        case "GET":
            const getResponse = await get(req.body)
            
            if(getResponse?.error) 
                return res.status(500).send(getResponse)
            return res.status(200).send(getResponse)

        default:
            return res.status(404).end()
    }
}

export default Categories