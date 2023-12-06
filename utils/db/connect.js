import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => mongoose.connect(MONGODB_URI).catch(error => console.log(error));

export default connect;