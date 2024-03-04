import { Schema, model, models } from "mongoose"

const schema = new Schema({
    code: {type: String, required: true},
    name: {type: String, required: true},
    description: String,
    categories: [{type: Schema.Types.ObjectId, ref: 'Category'}],
    subcategories: [{type: Schema.Types.ObjectId, ref: 'Subcategory'}],
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
    date_start: {type: Date, default: () => Date.now() },
    date_end: {type: Date, default: () => Date.now() + 5*365*24*60*60*1000 },
    unit: {type: String, required: true},
    value: {type: Number, required: true},
    usage: {
        max: Number,
        used: {type: Number, default: 0}
    }
},{ timestamps: true })

const PromoCode = models.PromoCode || model('PromoCode', schema);

export default PromoCode;