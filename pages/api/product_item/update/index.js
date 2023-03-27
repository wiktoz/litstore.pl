import ProductItem from "../../../../models/product_item"
import connect from '../../../../utils/connectDb'

const UpdateProductItem = async (req, res) => {
    await connect()

    const query = req.body.map(item => {
        return { 
            updateOne :
            {
               "filter": {_id: item._id},
               "update": {price: item.price}
            }
         }
    })

    await ProductItem.bulkWrite(query).then((product)=>{
        return res.status(200).send(product)
    }).catch((err)=>{
        return res.status(503).send(err)
    })  
}

export default UpdateProductItem