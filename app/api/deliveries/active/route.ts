import { getActive } from "/utils/handlers/delivery"
import {NextResponse} from "next/server";

export default async function GET(req, res) {
        const getResponse = await getActive()

        if(getResponse?.error)
            return NextResponse.status(500).send(getResponse)
        return NextResponse.json(getResponse, { status: 200 })
}