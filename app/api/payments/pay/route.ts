import connect from "/utils/db/connect"
import ProductItem from "/models/product_item"
import Order from "/models/order"
import mail from '/utils/nodemailer'
import sha256 from 'crypto-js/sha256'
import OrderCompleted from "/mails/OrderCompleted"
import { render } from '@react-email/render'
import {auth} from "/auth";


const generateUrl = (fields) => {
    let query = ""

    for (const [key, value] of Object.entries(fields)) {
        query = query + "&" + key + "=" + value
    }

    return process.env.PAYMENT_START_URL + "?" + query.slice(1)
}

export async function POST(req, res){
    const session = await auth(req, res)
    await connect()

    const body = await req.json()
    const cart = body.cart

    if(!cart)
        return Response.json({ error: "No cart" }, { status: 200 })

    const ids = cart.items?.map(({id}) => id)

    return ProductItem.find({_id: {$in: ids}}).then(async (products) => {
        const price = products.reduce((count, obj, index) => count + (obj.price*cart.items[index].qty), 0)
        const paymentPrice = ((price * 100) / 100).toFixed(2)

        const notInStock = products.map(product => {
            cart.items.filter((item) => item.id === product._id && item.qty > product.stock)
        })

        if(notInStock.length === 0)
            return Response.json({ error: "Not enough products in stock" }, { status: 200 })

        /*
            check data correctness
        */

        if(session?.user?.id) cart.buyer.user_id = session.user.id

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


        /*const template = render(<OrderCompleted order={order} />)
        const mailStatus = await mail("LitStore Service", customerEmail, "Złożono zamówienie", template)
        console.log(mailStatus)*/

        return Response.json(url, { status: 200 })

    }).catch((err) => {
        return Response.json(err, { status: 200 })
    })
}
