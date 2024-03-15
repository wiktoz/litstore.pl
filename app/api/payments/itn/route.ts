import Base64 from 'crypto-js/enc-base64'
import xml2js from 'xml2js'
import { toXML } from 'jstoxml'
import connect from '@/utils/db/connect'
import Order from '@/models/order'
import sha256 from "crypto-js/sha256"
import {NextRequest} from "next/server"

interface DataJsonType {
    transactionList: {
        serviceID: string,
        hash: string,
        transactions: {
            transaction: {
                orderID: string,
                remoteID: string,
                amount: string,
                currency: string,
                gatewayID: string,
                paymentDate: string,
                paymentStatus: string,
                paymentStatusDetails: string
            }
        }
    }
}

function isCorrectData(object: any): object is DataJsonType {
    return (
        typeof object === 'object' &&
        (typeof object.transactionList.serviceID === 'string') &&
        (typeof object.transactionList.hash === 'string') &&
        (typeof object.transactionList.transactions.transaction.orderID === 'string') &&
        (typeof object.transactionList.transactions.transaction.remoteID === 'string') &&
        (typeof object.transactionList.transactions.transaction.amount === 'string') &&
        (typeof object.transactionList.transactions.transaction.currency === 'string') &&
        (typeof object.transactionList.transactions.transaction.gatewayID === 'string') &&
        (typeof object.transactionList.transactions.transaction.paymentDate === 'string') &&
        (typeof object.transactionList.transactions.transaction.paymentStatus === 'string') &&
        (typeof object.transactionList.transactions.transaction.paymentStatusDetails === 'string')
    )
}

const parseXML:any = (data:string) => {
    return xml2js.parseString(data, (err, result) => {
        if (err) {
            return ""
        }

        return result
    })
}

export async function GET(req: NextRequest){
    const body = await req.json()

    const decode = Base64.parse(body.transactions).toString()
    const parsed = parseXML(decode)


    if(!isCorrectData(parsed))
        return

    const dataJson:DataJsonType = parsed

    const serviceID = dataJson.transactionList.serviceID
    const hash = dataJson.transactionList.hash
    const transaction = dataJson.transactionList.transactions.transaction

    const PAYMENT_ID = "806241"
    const PAYMENT_KEY = "e82a30df834de6c044cd46158576b4f5e2d61e4fbd4a05b0ce8c181c260b6973"

    let confirmation = "CONFIRMED"

    const hashFields = {
        "serviceID": serviceID,
        "orderID": transaction.orderID,
        "remoteID": transaction.remoteID,
        "amount": transaction.amount,
        "currency": transaction.currency,
        "gatewayID": transaction.gatewayID,
        "paymentDate": transaction.paymentDate,
        "paymentStatus": transaction.paymentStatus,
        "paymentStatusDetails": transaction.paymentStatusDetails
    }
    const calcHash = sha256(Object.values(hashFields).join('|') + "|" + PAYMENT_KEY).toString()

    await connect()
    const order = await Order.findOne({_id: transaction.orderID})

    if(hash !== calcHash) confirmation = "NOTCONFIRMED"
    if(serviceID !== PAYMENT_ID) confirmation = "NOTCONFIRMED"
    if(!order) confirmation = "NOTCONFIRMED"
    if(transaction.amount !== order.payment.amount) confirmation = "NOTCONFIRMED"

    const returningHashFields = {
        "serviceID": serviceID,
        "orderID": transaction.orderID,
        "confirmation": confirmation
    }
    const returningHash = sha256(Object.values(returningHashFields).join('|') + "|" + PAYMENT_KEY).toString()

    const returnObject = {
        confirmationList : {
            serviceID: serviceID,
            transactionsConfirmations: {
                transactionConfirmed: {
                    orderID: transaction.orderID,
                    confirmation: confirmation
                }
            },
            hash: returningHash
        }
    }

    const xml = toXML(returnObject)

    if(confirmation === "CONFIRMED"){
        order.payment.status = transaction.paymentStatus
        await order.save()
    }

    const response = new Response(xml, {
        status: 200,
        statusText: "ok",
    })

    response.headers.append("Content-Type", "text/xml")

    return response
}
