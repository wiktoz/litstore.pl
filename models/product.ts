import mongoose, { Schema, model, models } from "mongoose"
import Variant from "@/models/variant"

const slug = require('mongoose-slug-updater')

mongoose.plugin(slug)

const schema = new Schema({
    name: {type: String, required: true},
    description: String,
    manufacturer: String,
    category: String,
    subcategory: String,
    variant: [{type: Schema.Types.ObjectId, ref: 'Variant' }],
    main_photo: String,
    photos: {type: Array, required: true},
    new_badge: {type: Boolean, default: false},
    active: {type: Boolean, default: true},
    slug: { type: String, slug: "name", slugPaddingSize: 1, unique: true }
}, { timestamps: true })

schema.index({name: 'text', manufacturer: 'text', description: 'text'})
/*schema.index({'$**': 'text'})*/

const Product = models.Product || model('Product', schema);

export default Product