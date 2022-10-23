import connectDb from '../../../utils/connectDb'
import User from '../../../models/user'

export default async function getUsers(req,res){
    await connectDb()
    const users = await User.find({})

    return res.status(200).json(users)
}