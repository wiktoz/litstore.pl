import Product from '../../../../models/product'
import connectDb from '../../../../utils/db/connect'

const getProduct = async (req, res) => {
    await connectDb()

    return Product.find({
        $or: [
            { name: { $regex: req.query.search, '$options': 'i' } },
            { producer: { $regex: req.query.search, '$options': 'i' } },
        ]
    }).then(products => {
        return res.status(200).json(products)
    }).catch(err => {
        return res.status(503).send(err)
    })
}

export default getProduct