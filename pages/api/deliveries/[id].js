import connect from '../../../utils/connectDb'
import Delivery from '../../../models/delivery'

export default async function getDelivery(req,res){
    await connect()
    const deliveries = await Delivery.findOne({_id: req.query.id})

    return res.status(200).json(deliveries)
}