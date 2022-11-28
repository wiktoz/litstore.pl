import Category from "../../../models/category"
import connectDb from "../../../utils/connectDb"

export default async function createCategory(req,res){
    await connectDb()
    const body = JSON.parse(JSON.stringify(req.body))
    const result = await Category.create(body)

    return res.status(200).json(result)
}