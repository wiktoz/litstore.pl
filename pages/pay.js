import useShoppingCart from '../context/ShoppingCart'
import bcrypt from 'bcryptjs'

import * as dotenv from 'dotenv'
dotenv.config()

const handlePayment = (req, res) => {
    const { state, dispatch } = useShoppingCart()
    
    if(state.cart && state.delivery && state.buyer){
        const paymentId = process.env.PAYMENT_ID
        const paymentKey = process.env.PAYMENT_KEY

        const paymentURL = ""

        return res.status(200).return(paymentURL)
    }
    else{
        return res.status(503).send({err: "no requried data"})
    }
}