import connect from "../../../utils/connectDb"
import ProductItem from "../../../models/product_item" 

const Pay = async (req, res) => {
    await connect()

    const ids = req.body.cartItems?.map(({id}) => id)

    ProductItem.find({_id: {$in: ids}}).then((products) => {
        const price = products.reduce((count, obj) => count + obj.price, 0)

        return res.status(200).send({
            price,
        })
    }).catch((err) => {
        return res.status(503).send(err)
    })
}

export default Pay