import Order from "../../models/order"
import connect from "../connectDb"

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

const getById = async (id) => {
    await connect()
    
    return Order.findOne({_id: id}).populate({
        path : 'items.id',
        populate : {
          path : 'product_id'
        }
    })
    .populate("delivery.id").lean()
    .then(async (order) => {
        order.items = order?.items.map(item => ({
            ...item.id.product_id,
            qty: item.qty,
            unit: item.id.unit,
            price: item.id.price
        })) || []
        return order
    })
    .catch(err => {
        return { error: 1, errorMessage: err }
    })
}

const getByUserId = async (id) => {
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

            return orders.map(order => {
                order.delivery = order.delivery.id
                order.items = order?.items.map(item => ({
                    ...item.id.product_id,
                    qty: item.qty,
                    unit: item.id.unit,
                    price: item.id.price
                }))
                return order
            })
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