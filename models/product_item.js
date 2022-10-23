import { Schema, model, models } from "mongoose"

const schema = new Schema({
    product_id: {type: Schema.Types.ObjectId, ref: 'Product'},
    options: [{type: Schema.Types.ObjectId, ref: 'VariantOption'}],
    stock: {type: Number, default: 0},
    unit: {type: String, default: "szt." },
    price: {type: Number, default: null}
})

const ProductItem = models.ProductItem || model('ProductItem', schema);

export default ProductItem;