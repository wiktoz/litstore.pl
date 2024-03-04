import mongoose, { Schema, model, models } from "mongoose"

const slug = require('mongoose-slug-updater')

mongoose.plugin(slug)

const schema = new Schema({
    name: {type: String, required: true},
    description: String,
    img: String,
    price: {type: Number, required: true},
    free_from: Number,
    cash_on_delivery: {type: Boolean, required: true},
    personal_collection: {type: Boolean, required: true},
    active: {type: Boolean, default: true},
    slug: { type: String, slug: "name", slugPaddingSize: 1, unique: true }
}, { timestamps: true })

const Delivery = models.Delivery || model('Delivery', schema)

export default Delivery