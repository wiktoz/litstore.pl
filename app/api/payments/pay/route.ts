import connect from "@/utils/db/connect"
import Item from "@/models/item"
import Order from "@/models/order"
import sha256 from 'crypto-js/sha256'
import Delivery from "@/models/delivery";
import {NextRequest, NextResponse} from "next/server";


const generateUrl = (fields: {
    Description: string;
    CustomerEmail: string;
    Amount: string;
    OrderID: string;
    Hash: string;
    ServiceID: string
}) => {
    let query = ""

    for (const [key, value] of Object.entries(fields)) {
        query = query + "&" + key + "=" + value
    }

    return process.env.PAYMENT_START_URL + "?" + query.slice(1)
}

const getIds = (items: CartItemInterface[]) => {
    return items.map(item => item.item_id)
}

const getQtyById = (cartItems:CartItemInterface[], id:string) => {
    if(!cartItems)
        return 0

    const found = cartItems.find(item => item.item_id === id)

    if(!found)
        return 0

    return found.qty
}

const getItems = async (cartItems: CartItemInterface[]) => {
    const ids = getIds(cartItems)

    try {
        const items:ItemInterface[] = await Item.find({_id: {$in: ids}})

        if(!items)
            return []

        return items.map(item => {
            return {
                item_id: item._id,
                product_id: item.product_id,
                price: item.price,
                qty: getQtyById(cartItems, item._id.toString()),
                stockQty: item.stock
            }
        })

    } catch (err){
        return []
    }
}

const getDelivery = async (delivery_id:string) => {
    try {
        const delivery = await Delivery.findOne({_id: delivery_id})

        if(!delivery)
            return null

        return delivery
    }
    catch (err) {
        return null
    }
}

const createOrder = async (order:any) => {
    try {
        const o = await Order.create(order)

        if(!o)
            return null

        return o
    }
    catch (err) {
        return null
    }
}

const updatePaymentInfo = async (order_id: string, hash:string, url:string) => {
    try {
        const o = await Order.updateOne({_id: order_id}, {
            $set: {
                "payment.hash": hash,
                "payment.url": url
            }
        })

        if(!o)
            return null

        return o
    }
    catch (err) {
        return null
    }
}

export async function POST(req:NextRequest, res:NextResponse){
    const body = await req.json()
    const cart = body.cart

    if(!cart)
        return Response.json({ error: "No cart" }, { status: 200 })

    /*
        VALIDATE BODY
     */


    await connect()

    /*
        GET items from db
    */
    const items = await getItems(cart.items)

    if(items.length === 0)
        return Response.json({ error: "No items" }, { status: 200 })


    /*
        GET delivery method from db
    */
    const delivery = await getDelivery(cart.delivery.delivery_id)

    if(!delivery)
        return Response.json({ error: "No delivery" }, { status: 200 })


    /*
        Checking whether items are in stock
     */
    const itemsNotInStock = items.filter(item => item.qty > item.stockQty)

    if(itemsNotInStock.length > 0)
        return Response.json({ error: "Not enough items in stock", items: itemsNotInStock }, { status: 200 })

    /*
        Calculating prices
     */
    const itemsPrice:number = items.reduce((sum, item) => sum + item.qty*item.price, 0)
    const deliveryPrice:number = itemsPrice >= delivery.free_from ? 0 : delivery.price
    const totalPrice:number = itemsPrice + deliveryPrice


    /*
        Inserting order to database
     */
    //const session = await auth(req, res)

    const buyer = {
        //user_id: "",
        email: cart.buyer.email,
        name: cart.buyer.name,
        surname: cart.buyer.surname,
        street: cart.buyer.street,
        house: cart.buyer.house,
        flat: cart.buyer.flat,
        city: cart.buyer.city,
        post_code: cart.buyer.post_code
    }

    //if(session && session.user)
    //    buyer.user_id = session.user.id

    const itemsFormatted = items.map(({stockQty, ...keepAttrs}) => keepAttrs)

    const payment = {
        amount: totalPrice,
        currency: "PLN",
        method: "Online payment - BlueMedia",
        status: "PENDING",
    }

    const order = {
        buyer: buyer,
        delivery: {
            id: delivery._id,
            price: deliveryPrice,
            email: cart.delivery.email,
            name: cart.delivery.name,
            surname: cart.delivery.surname,
            street: cart.delivery.street,
            house: cart.delivery.house,
            flat: cart.delivery.flat,
            city: cart.delivery.city,
            post_code: cart.delivery.post_code
        },
        items: itemsFormatted,
        payment: payment,
        status: "payment"
    }

    const createdOrder = await createOrder(order)

    if(!createdOrder)
        return Response.json({ error: "Cannot create order" }, { status: 200 })


    /*
        Preparing URL for payment operator
     */
    const PAYMENT_ID = process.env.PAYMENT_ID
    const PAYMENT_KEY = process.env.PAYMENT_KEY

    if(!PAYMENT_ID || !PAYMENT_KEY)
        return Response.json({ error: "No key to start transaction" }, { status: 200 })

    const description = "litstore" //encode url Content-Type: url-encoded

    const hashFields = {
        ServiceID: PAYMENT_ID,
        OrderID: createdOrder._id.toString(),
        Amount: totalPrice.toFixed(2),
        Description: description,
        CustomerEmail: createdOrder.buyer.email,
    }

    const hash = sha256(Object.values(hashFields).join('|') + "|" + PAYMENT_KEY).toString()

    const paymentFields = { ...hashFields, Hash: hash }

    const url = generateUrl(paymentFields)


    /*
        Updating order payment info to database
     */
    const finalOrder = await updatePaymentInfo(createdOrder._id, hash, url)

    if(!finalOrder)
        return Response.json({ error: "Cannot update order" }, { status: 200 })


    return Response.json({url: url}, { status: 200 })
}
