'use client'

import Cart from "@/components/cart/Cart"
import SummaryBox from "@/components/cart/SummaryBox"
import {useShoppingCart} from "@/context/ShoppingCart";
import {useRouter} from "next/navigation";
import {AnimatePresence, motion} from "framer-motion";
import CartItem from "@/components/cart/CartItem";
import {ShoppingBagIcon} from "@heroicons/react/24/outline";
import Link from "next/link";

const ShoppingCart = () => {
    const router = useRouter()
    const {cartItems} = useShoppingCart() as ShoppingCartContextType

    return(
        <div className={"my-8"}>
        <AnimatePresence>
            {
                cartItems.length > 0 ?
                    <>
                        <div className={"flex flex-row px-1 py-2 items-center gap-1 w-full text-gray-700"}>
                            <div className={"text-xl font-semibold text-gray-700"}>
                                Bag
                            </div>
                        </div>
                        <motion.div className={"flex flex-row gap-4"}>
                            <motion.div className={"w-2/3 flex flex-col"}>
                                <Cart noBtn={false}/>
                            </motion.div>
                            <motion.div className={"w-1/3"}>
                                <SummaryBox
                                    nextStep={() => router.push('/cart/delivery')}
                                    nextStepTitle={"Dalej"}
                                />
                            </motion.div>
                        </motion.div>
                    </>
                    :
                    <motion.div
                        exit={{opacity: 0, y: 200}}
                        initial={{opacity: 0, y: 200}}
                        animate={{opacity: 1, y: 0}}
                        className="flex flex-col justify-center items-center h-96">
                        <ShoppingBagIcon
                            className="h-24 w-24 text-gray-400"
                            aria-hidden="true"
                        />
                        <p className="my-4 text-gray-700 font-semibold">Your bag is empty</p>
                        <Link href={"/"}>
                            <p className="text-gray-700 text-xs py-1 my-2 hover:cursor-pointer">
                                Explore products
                            </p>
                        </Link>
                    </motion.div>
            }
        </AnimatePresence>
        </div>
    )
}

export default ShoppingCart