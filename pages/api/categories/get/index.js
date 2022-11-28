import connect from '../../../../utils/connectDb'
import Category from '../../../../models/category'

const getCategories = async (req,res) => {
    await connect()
    const categories = await Category.find({})

    return res.status(200).json(categories)
}

export default getCategories