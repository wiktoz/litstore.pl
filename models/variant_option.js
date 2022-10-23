import { Schema, model, models } from "mongoose"

const schema = new Schema({
    variant_id: {type: Schema.Types.ObjectId, ref: 'Variant'},
    name: String
})

const VariantOption = models.VariantOption || model('VariantOption', schema);

export default VariantOption