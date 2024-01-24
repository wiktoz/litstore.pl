import mongoose, { Schema, model, models } from "mongoose"

const slug = require('mongoose-slug-updater')

mongoose.plugin(slug)

const schema = new Schema({
    name: String,
    img: String,
    price: Number,
    freeFrom: Number,
    cod: Boolean,
    active: Boolean,
    slug: { type: String, slug: "name", slugPaddingSize: 1, unique: true }
})

const Delivery = models.Delivery || model('Delivery', schema)

export default Delivery