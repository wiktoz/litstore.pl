import connect from '../../utils/connectDb'
import User from '../../models/user'
import hashPassword from "../../utils/hashPassword";

export default async function registerHandler(req, res){
    const body = req.body

    if(body.email.isEmpty)
        return res.status(200).json({error: "Email cannot be empty!"})
    if(body.password.length < 7)
        return res.status(200).json({error: "Password has to be at least 8 characters!"})

    await connect()
    const user = await User.findOne({email: body.email})

    if(user){
        return res.status(200).json({error: "User with this email already exists!"})
    }


    //create new user
    const hash = await hashPassword(body.password)

    const newUser = new User({
        email: body.email,
        password: hash
    })
    
    await newUser.save()

    return res.status(200).json({message: "Registered successfully"})
}