import Product from "../../../../models/product"
import connect from '../../../../utils/connectDb'

const ProductByCategoryId = async (req, res) => {
    const { id } = req.query

    await connect()

    await Product.find({category: id}).then((products)=>{
        return res.status(200).send(products)
    }).catch((err)=>{
        return res.status(503).send(err)
    })  
}

export default ProductByCategoryId