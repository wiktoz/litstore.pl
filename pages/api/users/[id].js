import User from "../../../models/user"
import connect from "../../../utils/connectDb"

const getUserById = async (req, res) => {
    await connect()

    const { id } = req.query

    await User.findOne({_id: id}, { password: 0, role: 0 })
    .then(user => {
        return res.status(200).send(user)
    })
    .catch(err => {
        return res.status(503).send(err)
    })
}

export default getUserById