import Product from "../../../../models/product"
import connect from '../../../../utils/connectDb'
import Variant from "../../../../models/variant"
import VariantOption from "../../../../models/variant_option"

const ProductBySlug = async (req, res) => {
    const { slug } = req.query

    await connect()

    await Product.findOne({slug: slug}).populate({
        path: 'variant',
        model: 'Variant',
        populate: {
            path: 'options',
            model: 'VariantOption'
        }
    }).then((product)=>{
        return res.status(200).send(product)
    }).catch((err)=>{
        return res.status(503).send(err)
    })  
}

export default ProductBySlug