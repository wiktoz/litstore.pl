import User from "../../../../../models/user"
import connect from "../../../../../utils/connectDb"

const AddAddress = async (req, res) => {
    await connect()

    const { id } = req.query

    const address = JSON.parse(JSON.stringify(req.body))

    await User.updateOne({_id: id}, { $push: { addresses: address }}).then(response => {
        return res.status(200).send({success: true})
    })
    .catch(err => {
        return res.status(503).send({success: false})
    })
}

export default AddAddress