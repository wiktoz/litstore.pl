import { Schema, model, models } from "mongoose"
import Delivery from "@/models/delivery"
import Item from "@/models/item"
import Product from "@/models/product"
import PromoCode from "@/models/code"

const schema = new Schema({
    number: {type: String, required: true, unique: true,
        default: () => Date.now().toString().slice(1, 11)
    },
    buyer: {
        user_id: {type: Schema.Types.ObjectId, ref: 'User'},
        email: {type: String, required: true},
        name: {type: String, required: true},
        surname: {type: String, required: true},
        street: {type: String, required: true},
        house: {type: String, required: false},
        flat: String,
        city: {type: String, required: true},
        post_code: {type: String, required: true}
    },
    delivery: {
        id: {type: String, required: true},
        price: {type: Number, required: true},
        email: {type: String, required: false},
        name: {type: String, required: true},
        surname: {type: String, required: false},
        street: {type: String, required: true},
        house: {type: String, required: false},
        flat: String,
        city: {type: String, required: true},
        post_code: {type: String, required: true}
    },
    items: [{
        item_id: {type: String, required: true},
        product_id: {type: String, required: true},
        qty: {type: Number, required: true},
        price: {type: Number, required: true}
    }],
    promo_code: {
        code: { type:String },
        discount: {type: Number }
    },
    payment: {
        amount: {type: Number, required: true},
        currency: {type: String, required: true},
        method: {type: String, required: true},
        hash: String,
        url: String,
        status: {type: String, required: true, default: "PENDING"},
    },
    status: {type: String, default: "payment", required: true },
}, { timestamps: true })

const Order = models.Order || model('Order', schema)

export default Order