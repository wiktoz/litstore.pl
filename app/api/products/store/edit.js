import ProductItem from "../../../../models/product_item"
import connect from "../../../../utils/db/connect"

export default async function EditStore(req, res){
    const { id, price, qty, unit, active } = req.body

    await connect()

    if(id.length != price.length != qty.length != unit.length != active.length){
        return res.status(503).send({error: "fill all the fields"})
    }

    //prepare array to update
    let updateValues = []

    for(let i=0; i < price.length; i++){
        updateValues.push({
            updateOne: {
                filter: { _id: id[i] },
                update: { price: price[i], stock: qty[i], unit: unit[i], active: active[i]}
            }
        })
    }

    await ProductItem.bulkWrite(updateValues).then((product) => {
        return res.status(200).send(product)
    }).catch((error) => {
        return res.status(503).send(error)
    })
}