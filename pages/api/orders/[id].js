import Order from '../../../models/order'
import connect from '../../../utils/connectDb'

const FindOrder = async (req, res) => {
    await connect()

    const {id} = req.query

    return Order.findOne({_id: id}).then((order) => {
        return res.status(200).send({order})
    })
    .catch((err) => {
        return res.status(503).send(err)
    })
}

export default FindOrder