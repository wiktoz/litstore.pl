import Order from "../../models/order"
import Product from "../../models/product"
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
        const items = await order?.items.map(item => ({...item.id.product_id, qty: item.qty, unit: item.id.unit, price: item.id.price})) || []
        order.items = items
        return order
    })
    .catch(err => {
        return { error: 1, errorMessage: err }
    })
}

export {
    get,
    getById
}