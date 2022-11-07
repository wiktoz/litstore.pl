import mongoose, { Schema, model, models } from "mongoose"

const schema = new Schema({
    number: Number,
    buyer: {
        user_id: String,
        email: String,
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
    items: Array,
    payment: {
        amount: String,
        method: String,
        hash: String,
        url: String,
        status: String,
    },
    status: {type: String, default: "payment" },
    date: {
        type: Date,
        default: Date.now
    }
})

const Order = models.Order || model('Order', schema)

export default Order