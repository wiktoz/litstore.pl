import {SHA256} from "crypto-js";

export const checkHashValidity = (ServiceID, OrderID, Hash) => {
    const PAYMENT_KEY = process.env.PAYMENT_KEY
    const hashFields = {
        "ServiceID": ServiceID,
        "OrderID": OrderID
    }

    const hash = SHA256(Object.values(hashFields).join('|') + "|" + PAYMENT_KEY).toString()

    return hash === Hash
}