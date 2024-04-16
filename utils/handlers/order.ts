import Order from "@/models/order"
import connect from "@/utils/db/connect"

const get = async (page:number, limit:number) => {
    await connect()

    if(page < 0)
        page = 0
    
    return Order.find({}).sort({"createdAt": -1}).limit(limit).skip(page*limit).exec()
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