import CartItem from "./CartItem"
import useShoppingCart from "../../context/ShoppingCart"
import {AnimatePresence, motion} from 'framer-motion'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import Link from "next/link"

export default function Cart(){
    const { cartQty, cartItems, cartBuyer, getItemQty, increaseQty, decreaseQty, removeFromCart } = useShoppingCart()

    const handleDecrease = (e, id) => {
        e.preventDefault()
        decreaseQty(id)
    }

    const handleIncrease = (e, id) => {
        e.preventDefault()
        increaseQty(id)
    }

    const handleRemove = (e, id) => {
        e.preventDefault()
        removeFromCart(id)
    }

    return(
        <div className="flex flex-col">
            
            {
                cartItems && cartItems.length > 0 ?
                <div className="grid grid-cols-12 gap-4">
                    <AnimatePresence>
                        {
                            cartItems.map(item => {
                                return(
                                <motion.div 
                                    key={item.id}
                                    exit={{ opacity:0 }}
                                    initial={{ opacity:0 }}
                                    animate={{ opacity:1 }}
                                    className="col-span-12"
                                >
                                    <CartItem 
                                        id={item.id}
                                        qty={item.qty}
                                        
                                        handleIncrease={handleIncrease}
                                        handleDecrease={handleDecrease}
                                        handleRemove={handleRemove}
                                    />
                                </motion.div>
                                )
                            }) 
                        }
                        </AnimatePresence>
                    </div>
                
                : 
                <AnimatePresence>
                <motion.div
                    exit={{ opacity:0, y:200 }}
                    initial={{ opacity:0, y:200 }}
                    animate={{ opacity:1, y:0 }}
                    className="flex flex-col justify-center items-center h-full my-20">
                    <ShoppingBagIcon
                        className="h-24 w-24 text-gray-400"
                        aria-hidden="true"
                      />
                    <p className="my-4 text-gray-700 font-semibold">Twój koszyk jest pusty</p>
                    <Link href="/products">
                        <p className="text-gray-700 text-xs border-b-2 border-gray-400 py-1 my-2 hover:cursor-pointer">Sprawdź produkty</p>
                    </Link>
                </motion.div>
                </AnimatePresence>
            }
            
        </div>
    )
}