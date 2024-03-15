import CartItem from "./CartItem"
import { useShoppingCart } from "@/context/ShoppingCart"
import {AnimatePresence, motion} from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function Cart({noBtn}:{ noBtn: boolean }){
        const { cartItems } = useShoppingCart() as ShoppingCartContextType

        return(
            <AnimatePresence>
                <motion.div className={"flex flex-col gap-4"}>
                    {
                        cartItems.map(item => {
                            return (
                                <motion.div
                                    key={item.item_id}
                                    exit={{opacity: 0}}
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                >
                                    <CartItem id={item.item_id} qty={item.qty} noBtn={noBtn}/>
                                </motion.div>
                            )
                        })
                    }
                </motion.div>
            </AnimatePresence>
        )
}