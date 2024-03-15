import {NextRequest, NextResponse} from "next/server"
import { get } from "@/utils/handlers/product"
import fs from "fs"
import Product from "@/models/product"

export async function GET(){
    const res = await get()

    return NextResponse.json(res, {status: 200})
}

export async function POST(req: NextRequest){
    const data: FormData = await req.formData()
    const files: File[] = data.getAll("images") as unknown as File[]

    if(!files)
        return NextResponse.json({success: false, message: "No image"}, { status: 200 })


    /*
        Uploading data
     */
    const product = await Product.create({
        name: data.get("name"),
        description: data.get("description"),
        manufacturer: data.get("manufacturer"),
        category: data.get("category"),
        new_badge: data.get("new_badge"),
        active: data.get("active")
    })

    if(!product)
        return NextResponse.json({success: false, message: "Failed to create product"}, { status: 200 })

    /*
        Uploading files to local storage
     */
    const images:string[] =
        await Promise.all(
            Array.from(files).map(async (file: File, index: number) => {
                const bytes = await file.arrayBuffer()
                const buffer = Buffer.from(bytes)

                const fileExt = file.name.split('.').pop()
                let fileName

                if (index == 0)
                    fileName = product.slug + "." + fileExt
                else
                    fileName = product.slug + "-" + index + "." + fileExt

                fs.writeFileSync(`public/img/products/${fileName}`, buffer)
                return fileName
            })
        )


    /*
        Updating photo names to slug versions (for SEO)
        e.g. slug.png, slug-1.png ...
     */
    const updatedProduct = await Product.updateOne({_id: product._id}, {
        $set: {
            main_photo: images[0],
            photos: images.slice(1)
        }
    })

    return NextResponse.json({success: true, message: "Uploaded", product: updatedProduct}, { status: 200 })
}