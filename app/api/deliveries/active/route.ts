import { getActive } from "@/utils/handlers/delivery"
import {NextResponse} from "next/server";

export default async function GET() {
        const response = await getActive()

        return NextResponse.json(response, { status: 200 })
}