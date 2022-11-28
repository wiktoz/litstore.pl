import mongoose, { Schema, model, models } from "mongoose"
import VariantOption from "./variant_option"
const slug = require('mongoose-slug-updater')

mongoose.plugin(slug)

const schema = new Schema({
    name: String,
    displayName: String,
    selectOption: String,
    options: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'VariantOption' 
    }],
    slug: { type: String, slug: "name", slugPaddingSize: 1, unique: true }
})

const Variant = models.Variant || model('Variant', schema);

export default Variant;