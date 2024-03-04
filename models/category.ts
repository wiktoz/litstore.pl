import mongoose, { Schema, model, models } from "mongoose"
const slug = require('mongoose-slug-updater')

mongoose.plugin(slug)

const schema = new Schema({
    name: {type: String, required: true},
    description: String,
    seo_description: String,
    bg_photo: String,
    active: {type: String, default: true, required: true},
    slug: { type: String, slug: "name", slugPaddingSize: 1, unique: true }
},
{ timestamps: true })

const Category = models.Category || model('Category', schema);

export default Category;