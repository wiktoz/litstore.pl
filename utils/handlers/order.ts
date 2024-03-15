import Order from "@/models/order"
import connect from "@/utils/db/connect"

const get = async () => {
    await connect()
    
    return Order.find({}).sort({"date": -1})
    .then(order => { 
        return order
    })
    .catch(err => {
        return { error: 1, errorMessage: err }
    })
}

const getById = async (id:string) => {
    await connect()
    
    return Order.findOne({_id: id})
    .then(async (order) => {
        return order
    })
    .catch(err => {
        return { error: 1, errorMessage: err }
    })
}

const getByUserId = async (id:string) => {
    await connect()

    return Order.find({"buyer.user_id": id}).populate({
        path : 'items.id',
        populate : {
            path : 'product_id'
        }
    })
        .populate("delivery.id").lean()
        .then(async (orders) => {
            if(!orders) return []

            return orders
        })
        .catch(err => {
            return { error: 1, errorMessage: err }
        })
}

export {
    get,
    getById,
    getByUserId
}