import mongoose from 'mongoose';
import {NextResponse} from "next/server";

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
    if(!MONGODB_URI)
        return NextResponse.json({error: "No URI"}, { status: 501 })

    mongoose.connect(MONGODB_URI).catch(error => {
        return NextResponse.json(error, { status: 501 })
    });
}

export default connect;