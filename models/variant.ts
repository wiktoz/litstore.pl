import mongoose, { Schema, model, models } from "mongoose"
import VariantOption from "@/models/variant_option"
const slug = require('mongoose-slug-updater')

mongoose.plugin(slug)

const schema = new Schema({
    name: {type: String, required: true},
    display_name: {type: String, required: true},
    select_option: {type: String, enum: ['list', 'button'], default: 'list'},
    options: [{type: Schema.Types.ObjectId, ref: 'VariantOption'}],
    slug: { type: String, slug: "name", slugPaddingSize: 1, unique: true }
}, { timestamps: true })

const Variant = models.Variant || model('Variant', schema);

export default Variant;