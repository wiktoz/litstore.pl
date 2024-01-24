import mongoose from 'mongoose';
import {NextResponse} from "next/server";

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => mongoose.connect(MONGODB_URI).catch(error => {
    return NextResponse.json(error, { status: 501 })
});

export default connect;