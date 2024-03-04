import { Schema, model, models } from "mongoose"

const schema = new Schema({
    product_id: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
    options: [{
        variant_id: {type: Schema.Types.ObjectId, ref: 'Variant', required: true},
        option_id: {type: Schema.Types.ObjectId, ref: 'VariantOption', required: true}
    }],
    stock: {type: Number, default: 0},
    unit: {type: String, default: "szt." },
    price: {type: Number, required: true}
}, { timestamps: true })

const Item = models.Item || model('Item', schema);

export default Item