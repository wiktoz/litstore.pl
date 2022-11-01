import mongoose, { Schema, model, models } from "mongoose"

const schema = new Schema({
    number: Number,
    buyer: {
        user_id: String,
        name: String,
        street: String,
        house: String,
        flat: String,
        city: String,
        postcode: String
    },
    delivery: {
        id: String,
        price: Number,
    },
    products: Array,
    payment: {
        method: String,
        hash: String,
        url: String,
        status: String,
    },
    status: String,
    date: Date.now(),
})

const Order = models.Order || model('Order', schema)

export default Order