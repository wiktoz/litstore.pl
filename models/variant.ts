import mongoose, { Schema, model, models } from "mongoose"
const slug = require('mongoose-slug-updater')

mongoose.plugin(slug)

const schema = new Schema({
    name: String,
    displayName: String,
    selectOption: String,
    options: [{ 
        name: String
    }],
    slug: { type: String, slug: "name", slugPaddingSize: 1, unique: true }
})

const Variant = models.Variant || model('Variant', schema);

export default Variant;