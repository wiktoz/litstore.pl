import connect from '../../../utils/connectDb'
import Delivery from '../../../models/delivery'

export default async function getDeliveries(req,res){
    await connect()
    const deliveries = await Delivery.find({active: true})

    return res.status(200).json(deliveries)
}