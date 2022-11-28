import ProductItem from "../../../../models/product_item"
import connect from "../../../../utils/connectDb"

export default async function EditStore(req, res){
    const { id, price, qty, unit, active } = req.body

    await connect()

    if(price.length != qty.length || qty.length != unit.length || unit.length != active.length){
        return res.status(503).send({error: "fill all the fields"})
    }

    //prepare array to update
    let updateValues = []
    let query

    for(let i=0; i < price.length; i++){
        query = {
            updateOne: {
                filter: { _id: id[i] },
                update: { price: price[i], stock: qty[i], unit: unit[i], active: active[i]}
            }
        }
        updateValues.push(query)
    }

    await ProductItem.bulkWrite(updateValues).then((product) => {
        return res.status(200).send(product)
    }).catch((error) => {
        return res.status(503).send(error)
    })
}