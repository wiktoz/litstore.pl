import { Schema, model, models } from "mongoose"
import Variant from "@/models/variant"

const schema = new Schema({
    name: {type: String, required: true}
}, { timestamps: true })

const VariantOption = models.VariantOption || model('VariantOption', schema);

export default VariantOption