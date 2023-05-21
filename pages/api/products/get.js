import Product from '../../../models/product'
import connect from '../../../utils/connectDb'

const getProduct = async (req, res) => {
    await connect()
    
    await Product.find({active: true}).then(products => {
        return res.status(200).json(products)
    }).catch(err => {
        return res.status(503).send(err)
    })
}

export default getProduct