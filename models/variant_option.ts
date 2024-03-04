import { Schema, model, models } from "mongoose"
import Variant from "@/models/variant"

const schema = new Schema({
    variant_id: {type: Schema.Types.ObjectId, ref: 'Variant'},
    name: {type: String, required: true}
}, { timestamps: true })

const VariantOption = models.VariantOption || model('VariantOption', schema);

export default VariantOption