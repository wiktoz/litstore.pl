import Delivery from "../../models/delivery"
import connect from "../connectDb"

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
    
    return Delivery.findOne({$or: [ {slug: slug}, {_id: slug} ]})
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