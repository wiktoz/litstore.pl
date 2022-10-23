import { Schema, model, models } from "mongoose"

const schema = new Schema({
    email: String,
    password: String,
    role: String,
    billingAddress:{
        name: String,
        street: String,
        houseNumber: String,
        flatNumber: String,
        postcode: String,
        city: String
    }
})

const User = models.User || model('User', schema);

export default User;