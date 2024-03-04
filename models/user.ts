import { Schema, model, models } from "mongoose"

const schema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, default: 'user', required: true},

    name: {type: String, required: true},
    surname: {type: String, required: true},
    street: {type: String, required: true},
    house: {type: String, required: true},
    flat: String,
    post_code: {type: String, required: true},
    city: {type: String, required: true},

    address: [{
        email: {type: String, required: true},
        name: {type: String, required: true},
        surname: {type: String, required: true},
        street: {type: String, required: true},
        house: {type: String, required: true},
        flat: String,
        post_code: {type: String, required: true},
        city: {type: String, required: true},
    }]
}, { timestamps: true })

const User = models.User || model('User', schema);

export default User;