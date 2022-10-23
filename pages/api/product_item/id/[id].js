import ProductItem from "../../../../models/product_item"
import Product from '../../../../models/product'
import Variant from '../../../../models/variant'
import connect from '../../../../utils/connectDb'

const ProductItemById = async (req, res) => {
    const { id } = req.query

    await connect()

    await ProductItem.findOne({_id: id}).populate([
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

export default ProductItemById