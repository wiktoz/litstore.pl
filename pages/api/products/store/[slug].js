import ProductItem from "../../../../models/product_item"
import Product from '../../../../models/product'
import connect from '../../../../utils/connectDb'

const ProductStore = async (req, res) => {
    const { slug } = req.query

    await connect()

    const product = await Product.findOne({slug: slug})

    if(product){
        await ProductItem.find({product_id: product._id})
        .then((product)=>{
            return res.status(200).send(product)
        }).catch((err)=>{
            return res.status(503).send(err)
        })
    }
    else return res.status(200).send({})
}

export default ProductStore