import mongoose, { Schema, model, models } from "mongoose"
const slug = require('mongoose-slug-updater')

mongoose.plugin(slug)

const schema = new Schema({
    category_id: {type: Schema.Types.ObjectId, ref: 'Category'},
    name: {type: String, required: true},
    description: String,
    seo_description: String,
    bg_photo: String,
    active: {type: Boolean, default: true, required: true},
    slug: { type: String, slug: "name", slugPaddingSize: 1, unique: true }
}, { timestamps: true })

const Subcategory = models.Subcategory || model('Subcategory', schema);

export default Subcategory;