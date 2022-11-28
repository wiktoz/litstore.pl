import connect from '../../../../utils/connectDb'
import Category from '../../../../models/category'

const getCategory = async (req,res) => {
    await connect()

    const { slug } = req.query
    const category = await Category.findOne({slug: slug})

    return res.status(200).json(category)
}

export default getCategory