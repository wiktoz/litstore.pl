import connectDb from '../../../utils/connectDb'
import Variant from '../../../models/variant'

export default async function getVariants(req,res){
    await connectDb()
    const variants = await Variant.find({}).populate("options")

    return res.status(200).json(variants)
}