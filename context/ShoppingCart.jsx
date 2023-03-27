import { useState, useEffect, useContext, createContext } from "react"
import useLocalStorage from "../hooks/useLocalStorage"

const defaultState = { cart: [], buyer: {} }

const ShoppingCartContext = createContext({})

export default function useShoppingCart(){
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children}){
    const [cartItems, setCartItems] = useLocalStorage("cartItems", [])
    const [cartBuyer, setCartBuyer] = useLocalStorage("cartBuyer", {})
    const [cartDelivery, setCartDelivery] = useLocalStorage("cartDelivery", {id: null, data: null})

    const cartQty = cartItems.reduce((qty, item) => item.qty + qty, 0)

    function setBuyer(buyer){
        setCartBuyer(buyer)
    }

    function setDelivery(id, data){
        setCartDelivery({id: id, data: data})
    }

    function getItemQty(id){
        return cartItems.find(item => item.id === id)?.qty || 0
    }

    function increaseQty(id){
        setCartItems(currItems => {
            if(currItems.find(item => item.id === id) == null) 
                return [...currItems, {id, qty: 1}]
            else return currItems.map(item => {
                if(item.id === id) return {...item, qty: item.qty + 1}
                else return item
            })
        })
    }

    function decreaseQty(id){
        setCartItems(currItems => {
            if(currItems.find(item => item.id === id)?.qty === 1)
                return currItems.filter(item => item.id !== id)
            else return currItems.map(item => {
                if(item.id === id) return {...item, qty: item.qty - 1}
                else return item
            })
        })
    }

    function removeFromCart(id){
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    return <ShoppingCartContext.Provider value={{cartQty, cartItems, cartBuyer, cartDelivery, setBuyer, setDelivery, getItemQty, increaseQty, decreaseQty, removeFromCart}}>{children}</ShoppingCartContext.Provider>
}