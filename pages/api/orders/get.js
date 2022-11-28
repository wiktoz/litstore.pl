import connect from "../../../utils/connectDb"
import Order from "../../../models/order"
import ProductItem from "../../../models/product_item"

const getOrders = async (req, res) => {
    await connect()

    return Order.find({}).sort({"date": -1}).then((orders) => {
        return res.status(200).send(orders)
    })
    .catch((err) => {
        return res.status(503).send(err)
    })
}

export default getOrders