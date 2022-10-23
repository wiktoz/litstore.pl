import connectDb from '../../../utils/connectDb'
import Delivery from '../../../models/delivery'

export default async function getDeliveries(req,res){
    await connectDb()
    const deliveries = await Delivery.find({})

    return res.status(200).json(deliveries)
}