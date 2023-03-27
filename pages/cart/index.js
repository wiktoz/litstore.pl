import Cart from "../../components/cart/Cart"
import SummaryBox from "../../components/cart/SummaryBox"
import useShoppingCart from "../../context/ShoppingCart"

const ShoppingCart = () => {
    const {cartItems} = useShoppingCart()

    return(
        <div className="grid grid-cols-12">
            { cartItems && cartItems.length > 0 ?
            <>
            <div className="col-span-12 my-4">
                <h1 className="text-lg font-bold text-gray-800">Twój Koszyk</h1>    
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

export default ShoppingCart