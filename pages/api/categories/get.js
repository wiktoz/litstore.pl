import connectDb from '../../../utils/connectDb'
import Category from '../../../models/category'

export default async function getCategories(req,res){
    await connectDb()
    const categories = await Category.find({})

    return res.status(200).json(categories)
}