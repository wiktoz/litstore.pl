'use client'

import {useContext, createContext, ReactNode, useState} from "react"
import Cookies from "js-cookie";

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined)

export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}

interface Props {
    children: ReactNode
}

const defaultBuyer:CartBuyerInterface = {
    city: "",
    email: "",
    house: "",
    name: "",
    post_code: "",
    street: "",
    surname: ""
}

const defaultDelivery:CartDeliveryInterface = {
    city: "",
    email: "",
    house: "",
    name: "",
    post_code: "",
    street: "",
    surname: "",
    delivery_id: ""
}

const ShoppingCartProvider = ({children}:Props) => {
    const [cartItems, setCartItems] = useState<CartItemInterface[]>(() => {
        const items = Cookies.get("cartItems")

        if(items)
            return JSON.parse(items)
        return []
    })

    const [cartBuyer, setCartBuyer] = useState<CartBuyerInterface>(() => {
        const buyer = Cookies.get("cartBuyer")

        if(buyer)
            return JSON.parse(buyer)
        return defaultBuyer
    })
    const [cartDelivery, setCartDelivery] = useState<CartDeliveryInterface>(() => {
        const delivery = Cookies.get("cartDelivery")

        if(delivery)
            return JSON.parse(delivery)
        return defaultDelivery
    })

    const cartQty = cartItems.reduce((qty: number, item: CartItemInterface) => item.qty + qty, 0)

    function setBuyer(buyer: CartBuyerInterface){
        setCartBuyer(buyer)
        Cookies.set("cartBuyer", JSON.stringify(buyer))
    }

    function setDelivery(delivery: CartDeliveryInterface){
        setCartDelivery(delivery)
        Cookies.set("cartDelivery", JSON.stringify(delivery))
    }

    function getItemQty(id: string){
        if(!cartItems)
            return 0
        return cartItems.find((cartItem: CartItemInterface) => cartItem.item_id === id)?.qty || 0
    }

    function increaseQty(id: string){
        console.log("here")
        if(!cartItems)
            return

        console.log("not here")
        const item = cartItems.find((item: CartItemInterface) => item.item_id === id)

        if(!item){
            const newItem = [...cartItems, { item_id: id, qty: 1}]

            setCartItems(newItem)
            Cookies.set("cartItems", JSON.stringify(newItem))
            return
        }

        const newItems = cartItems.map((item: CartItemInterface) => {
            if(item.item_id === id)
                return {...item, qty: item.qty += 1}
            return item
        })

        setCartItems(newItems)
        Cookies.set("cartItems", JSON.stringify(newItems))
    }

    function decreaseQty(id: string){
        if(!cartItems)
            return
        const item = cartItems.find((item: CartItemInterface) => item.item_id === id)

        if(!item)
            return

        if(item.qty === 1)
            return removeFromCart(id)

        const newItems = cartItems.map((item: CartItemInterface) => {
            if(item.item_id === id)
                return {...item, qty: item.qty -= 1}
            return item
        })

        setCartItems(newItems)
        Cookies.set("cartItems", JSON.stringify(newItems))
    }

    function removeFromCart(id: string){
        if(!cartItems)
            return

        const newItems = cartItems.filter((item: CartItemInterface) => item.item_id !== id)

        setCartItems(newItems)
        Cookies.set("cartItems", JSON.stringify(newItems))
    }

    return(
        <ShoppingCartContext.Provider
            value={{cartQty, cartItems, cartBuyer, cartDelivery,
                setBuyer, setDelivery, getItemQty,
                increaseQty, decreaseQty, removeFromCart}}>
            {children}
        </ShoppingCartContext.Provider>
    )
}

export default ShoppingCartProvider