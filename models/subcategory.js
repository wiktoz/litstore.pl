import mongoose, { Schema, model, models } from "mongoose"
const slug = require('mongoose-slug-updater')

mongoose.plugin(slug)

const schema = new Schema({
    category_id: String,
    name: String,
    description: String,
    seo_description: String,
    bg_photo: String,
    active: Boolean,
    slug: { type: String, slug: "name", slugPaddingSize: 1, unique: true }
})

const Subcategory = models.Subcategory || model('Subcategory', schema);

export default Subcategory;