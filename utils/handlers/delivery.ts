import Delivery from "../../models/delivery"
import connect from "../db/connect"
import {isValidObjectId, Types} from "mongoose";

const get = async () => {
    await connect()
    
    return Delivery.find({})
    .then(delivery => { 
        return delivery
    })
    .catch(err => {
        return { error: 1, errorMessage: err }
    })
}

const getActive = async () => {
    await connect()
    
    return Delivery.find({active: true})
    .then(delivery => { 
        return delivery
    })
    .catch(err => {
        return { error: 1, errorMessage: err }
    })
}

const getBySlug = async (slug) => {
    await connect()

    const query = await Delivery.findOne({
        $or: [
            { _id: isValidObjectId(slug) ? new Types.ObjectId(slug) : undefined },
            { slug }
        ]
    })
    
    return Delivery.findOne(query)
    .then(delivery => { 
        return delivery 
    })
    .catch(err => {
        return { error: 1, errorMessage: err }
    })
}

export {
    get,
    getActive,
    getBySlug
}