import mongoose, { Schema, model, models } from "mongoose"
const slug = require('mongoose-slug-updater')

mongoose.plugin(slug)

const schema = new Schema({
    name: String,
    description: String,
    seo_description: String,
    bg_photo: String,
    active: Boolean,
    slug: { type: String, slug: "name", slugPaddingSize: 1, unique: true }
})

const Category = models.Category || model('Category', schema);

export default Category;