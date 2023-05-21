import connect from "../../../utils/connectDb"
import ProductItem from "../../../models/product_item" 
import Order from "../../../models/order"
import mail from '../../../utils/nodemailer'
import sha256 from 'crypto-js/sha256'
import OrderCompleted from "../../../mails/OrderCompleted"
import { render } from '@react-email/render'


const generateUrl = (fields) => {
    let query = ""

    for (const [key, value] of Object.entries(fields)) {
        query = query + "&" + key + "=" + value
    }

    return process.env.PAYMENT_START_URL + "?" + query.slice(1)
}

const Pay = async (req, res) => {
    await connect()

    const cart = req.body.cart
    if(!cart) return res.status(503).send("No cart")

    const ids = cart.items?.map(({id}) => id)

    return ProductItem.find({_id: {$in: ids}}).then(async (products) => {
        const price = products.reduce((count, obj, index) => count + (obj.price*cart.items[index].qty), 0)
        const paymentPrice = ((price * 100) / 100).toFixed(2)

        const notInStock = products.map(product => {
            cart.items.filter((item) => item.id === product._id && item.qty > product.stock)
        })

        if(notInStock.length === 0)
            return res.status(503).send({ error: "Not enough products in stock" })

        /*
            check data correctness
        */

        const order = new Order({
            buyer: cart.buyer,
            delivery: cart.delivery,
            items: cart.items,
            payment: {
                amount: paymentPrice,
                method: "BlueMedia",
                status: "PENDING"
            }
        })

        await order.save()

        const PAYMENT_ID = process.env.PAYMENT_ID
        const PAYMENT_KEY = process.env.PAYMENT_KEY

        const description = "platnosclitstore" //encode url
        const customerEmail = order.buyer.email

        //Content-Type: url-encoded

        const hashFields = {
            "ServiceID": PAYMENT_ID,
            "OrderID": order._id.toString(),
            "Amount": paymentPrice,
            "Description": description,
            "CustomerEmail": customerEmail,
        }

        const hash = sha256(Object.values(hashFields).join('|') + "|" + PAYMENT_KEY).toString()
        
        const hashObject = { "Hash": hash }
        const paymentFields = { ...hashFields, ...hashObject }

        const url = generateUrl(paymentFields)

        order.payment.url = url
        order.payment.hash = hash
        await order.save()


        const template = render(<OrderCompleted order={order} />)
        const mailStatus = await mail("LitStore Service", "wiktoz05@wp.pl", "Złożono zamówienie", template)
        console.log(mailStatus)

        return res.status(200).send({url})

    }).catch((err) => {
        return res.status(503).send(err)
    })
}

export default Pay