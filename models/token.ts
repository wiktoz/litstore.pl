import mongoose, { Schema, model, models } from "mongoose"

const schema = new Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
    token: {type: String, required: true},
    createdAt: {type: Date, default: Date.now, expires: 3600}
})

const Token = models.Token || model('Token', schema);

export default Token;