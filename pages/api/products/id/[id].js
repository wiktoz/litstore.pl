import Product from "../../../../models/product"
import connect from '../../../../utils/connectDb'

const ProductById = async (req, res) => {
    const { id } = req.query

    await connect()

    await Product.findOne({_id: id}).then((product)=>{
        return res.status(200).send(product)
    }).catch((err)=>{
        return res.status(503).send(err)
    })  
}

export default ProductById