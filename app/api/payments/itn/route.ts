import Base64 from 'crypto-js/enc-base64'
import xml2js from 'xml2json'
import js2xml from 'js2xmlparser'
import connect from '@/utils/db/connect'
import Order from '@/models/order'
import sha256 from "crypto-js/sha256"
import {NextRequest} from "next/server";

interface DataJsonType {
    serviceID: string,

}

export async function GET(req: NextRequest){
    if(!req.body)
        return

    const body = await req.json()
    const decode = Base64.parse(body.transactions).toString()
    const dataJson = await xml2js.toJson(decode, { object: true }).transactionList

    if(!dataJson)
        return

    const transaction = dataJson.transactions.transaction

    const PAYMENT_ID = process.env.PAYMENT_ID
    const PAYMENT_KEY = process.env.PAYMENT_KEY

    let confirmation = "CONFIRMED"

    const hashFields = {
        "serviceID": dataJson.serviceID,
        "orderID": transaction.orderID,
        "remoteID": transaction.remoteID,
        "amount": transaction.amount,
        "currency": transaction.currency,
        "gatewayID": transaction.gatewayID,
        "paymentDate": transaction.paymentDate,
        "paymentStatus": transaction.paymentStatus,
        "paymentStatusDetails": transaction.paymentStatusDetails
    }
    const hash = sha256(Object.values(hashFields).join('|') + "|" + PAYMENT_KEY).toString()

    await connect()
    const order = await Order.findOne({_id: dataJson.orderID})

    if(dataJson.hash !== hash) confirmation = "NOTCONFIRMED"
    if(dataJson.serviceID !== PAYMENT_ID) confirmation = "NOTCONFIRMED"
    if(!order) confirmation = "NOTCONFIRMED"
    if(transaction.amount !== order.payment.amount) confirmation = "NOTCONFIRMED"

    const returningHashFields = {
        "serviceID": dataJson.serviceID,
        "orderID": dataJson.orderID,
        "confirmation": confirmation
    }
    const returningHash = sha256(Object.values(returningHashFields).join('|') + "|" + PAYMENT_KEY).toString()

    const returnObject = {
        serviceID: dataJson.serviceID,
        transactionsConfirmations: {
            transactionConfirmed: {
                orderID: dataJson.orderID,
                confirmation: confirmation
            }
        },
        hash: returningHash
    }

    const xml = js2xml.parse("confirmationList", returnObject)

    if(confirmation === "CONFIRMED"){
        order.payment.status = transaction.paymentStatus
        await order.save()
    }

    return new Response(xml, { status: 200, headers: { "Content-Type": "text/xml" } })
}
