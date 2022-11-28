import Product from '../../../../models/product'
import connectDb from '../../../../utils/connectDb'

const getProduct = async (req, res) => {
    await connectDb()
    Product.find({ 
        name: { $regex: req.query.search, '$options': 'i' }
    }).exec((err, products) => {
        if(err) return res.status(503).send(err)
        return res.status(200).json(products)
    })
}

export default getProduct