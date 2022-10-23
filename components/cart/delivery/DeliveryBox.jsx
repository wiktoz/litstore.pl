import useSWR from "swr"
import DeliveryItem from './DeliveryItem'
import useShoppingCart from "../../../context/ShoppingCart"
import Loader from "../../Loader"

const fetcher = url => fetch(url).then(r => r.json())

const DeliveryBox = ({pickDelivery}) => {
    const { data: deliveries, error} = useSWR('/api/deliveries/getActive', fetcher)
    const {cartDelivery} = useShoppingCart()
    
    if(error) return "An error has occured"
    if(!deliveries) return <Loader />

    return(
        <div className='flex flex-col lg:flex-row gap-2 pt-5'>
            {
                deliveries.map(item => {
                    return(
                        <DeliveryItem
                            key={item._id} 
                            id={item._id}
                            name={item.name}
                            img={item.img}
                            price={item.price}
                            isPicked={cartDelivery && cartDelivery.id == item._id ? true : false }
                            pickDelivery={pickDelivery}
                        />
                    )
                })
            }
        </div>
    )
}

export default DeliveryBox