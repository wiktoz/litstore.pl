import {NextRequest, NextResponse} from "next/server"
import {getById} from "@/utils/handlers/product"
import {readFileSync} from "fs";

export async function GET(req: NextRequest, context: { params: {id: string} }){
    const {id} = context.params
    const res = await getById(id)

    const getFiles = async (filePaths: string[]) => {
        return await Promise.all(filePaths.map((path: string) => {
            const split = path.split("/")
            const name = split[split.length - 1]
            const buffer = readFileSync(path)
            const base64Buffer = buffer.toString('base64')

            return {blob: base64Buffer, name: name}
        }))
    }

    const photos = ["public/img/products/" + res.main_photo, ...res.photos.map((photo:string) => {
        return "public/img/products/" + photo
    })]

    const response = await getFiles(photos)

    return NextResponse.json(response, {status: 200})
}