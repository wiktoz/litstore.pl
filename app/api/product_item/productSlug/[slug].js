import ProductItem from "../../../../models/product_item"
import Product from '../../../../models/product'
import Variant from '../../../../models/variant'
import connect from '../../../../utils/db/connect'

const ProductItemByProductId = async (req, res) => {
    const { slug } = req.query

    await connect()

    const product = await Product.findOne({slug: slug})

    await ProductItem.find({product_id: product.id}).populate([
        {
            path: 'product_id'
        },
        {
            path: 'options',
            populate:{
                path: 'variant_id'
            }
        }
    ]).then((product)=>{
        return res.status(200).send(product)
    }).catch((err)=>{
        return res.status(503).send(err)
    })  
}

export default ProductItemByProductId