import ProductItem from "../../../models/product_item"
import connect from '../../../utils/connectDb'

const GetProductItem = async (req, res) => {
    await connect()

    await ProductItem.find({}).then((product)=>{
        return res.status(200).send(product)
    }).catch((err)=>{
        return res.status(503).send(err)
    })  
}

export default GetProductItem