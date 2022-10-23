import Cart from "../../components/cart/Cart"
import SummaryBox from "../../components/cart/SummaryBox"
import useShoppingCart from "../../context/ShoppingCart"

export default function ShoppingCart(){
    const {cartItems} = useShoppingCart()

    return(
        <div className="grid grid-cols-12">
            { cartItems && cartItems.length > 0 ?
            <>
            <div className="col-span-12">
                <h1 className="text-2xl my-4 text-gray-900">Your Items</h1>    
            </div>
            <div className="col-span-12 md:col-span-8">
                <Cart />
            </div>
            <div className="col-span-12 md:col-span-4">
                <SummaryBox  
                    buttonLink="/cart/delivery"
                    buttonTitle="Dalej"
                />
            </div>
            </>
            :
            <div className="col-span-12">
                <Cart />
            </div>
            }
        </div>
    )
}