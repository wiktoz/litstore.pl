import { Schema, model, models } from "mongoose"

const schema = new Schema({
    email: String,
    password: String,
    role: String,
    billingAddress:{
        name: String,
        surname: String,
        street: String,
        postcode: String,
        city: String
    },
    addresses: [{
        name: String,
        surname: String,
        street: String,
        postcode: String,
        city: String
    }]
})

const User = models.User || model('User', schema);

export default User;