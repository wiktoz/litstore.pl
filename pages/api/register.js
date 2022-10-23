import bcrypt from 'bcryptjs'
import connectDb from '../../utils/connectDb'
import User from '../../models/user'

export default async function registerHandler(req, res){
    const body = req.body

    await connectDb()
    const user = await User.findOne({email: body.email})

    if(user){
        return res.status(200).json({message: "User with this email already exists!"})
    }


    //create new user
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(body.password, salt)
    const newUser = new User({
        email: body.email,
        password: hash
    })
    
    await newUser.save()

    return res.status(200).json({message: "Registered successfully"})
}