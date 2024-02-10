'use client'

import {useContext, createContext, ReactNode} from "react"
import useLocalStorage from "@/hooks/useLocalStorage"

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined)

export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}

interface Props {
    children: ReactNode
}

export function ShoppingCartProvider({children}:Props){
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("cartItems", [])
    const [cartBuyer, setCartBuyer] = useLocalStorage<CartBuyer>("cartBuyer", null)
    const [cartDelivery, setCartDelivery] = useLocalStorage<CartDelivery>("cartDelivery", null)

    const cartQty = cartItems.reduce((qty: number, item: CartItem) => item.qty + qty, 0)

    function setBuyer(buyer: CartBuyer){
        setCartBuyer(buyer)
    }

    function setDelivery(delivery: CartDelivery){
        setCartDelivery(delivery)
    }

    function getItemQty(id: string){
        return cartItems.find((cartItem: CartItem) => cartItem.item_id === id).qty || 0
    }

    function increaseQty(id: string){
        const item = cartItems.find((item: CartItem) => item.item_id === id)

        if(!item)
            return setCartItems([...cartItems, { item_id: id, qty: 1}])

        return setCartItems(cartItems.map((item: CartItem) => {
            if(item.item_id === id)
                return {...item, qty: item.qty++}
            return item
        }))
    }

    function decreaseQty(id: string){
        const item = cartItems.find((item: CartItem) => item.item_id === id)

        if(!item)
            return

        if(item.qty === 1)
            return removeFromCart(id)

        return setCartItems(cartItems.map((item: CartItem) => {
            if(item.item_id === id)
                return {...item, qty: item.qty--}
            return item
        }))
    }

    function removeFromCart(id: string){
        return setCartItems(cartItems.filter((item: CartItem) => item.item_id !== id))
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