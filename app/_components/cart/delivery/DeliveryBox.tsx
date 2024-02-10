import useSWR from "swr"
import DeliveryItem from './DeliveryItem'
import { useShoppingCart } from "@/context/ShoppingCart"
import Loader from "../../Loader"
import Geowidget from '../../Geowidget'
import AddressForm from "../../form/AddressForm"
import {fetcher} from "@/utils/helpers";

const DeliveryBox = () => {
    const { data: deliveries, error} = useSWR('/api/deliveries', fetcher)
    const { cartDelivery, setDelivery } = useShoppingCart() as ShoppingCartContextType
    
    if(error) return "An error has occurred"
    if(!deliveries) return <Loader />

    const pickDelivery = (id:string) => {
        setDelivery({
            ...cartDelivery,
            delivery_id: id
        })
    }

    const handleAddressData = (data: Address) => {
        if(cartDelivery && cartDelivery.delivery_id)
            setDelivery({
                ...cartDelivery,
                street: data.street,
                house: data.house,
                flat: data.flat,
                post_code: data.post_code,
                city: data.city
            })
    }

    return(
        <>
        <div className='flex flex-col lg:flex-row gap-2 pt-5'>
            {
                deliveries && deliveries.length > 0 &&
                deliveries.map((item:Delivery) => {
                    return(
                        <DeliveryItem
                            key={item._id}
                            delivery={item}
                            isPicked={(cartDelivery && cartDelivery.delivery_id === item._id) }
                            pickDelivery={ () => { pickDelivery(item._id) }}
                        />
                    )
                })
            }
        </div>
        <div className="w-full my-4">
            {
                deliveries && deliveries.length > 0 &&
                deliveries.map((item: Delivery) => {
                    return (
                    cartDelivery && cartDelivery.delivery_id === item._id ?
                        item.name === "InPost" ?
                            <Geowidget key="InPostGeowidget" id={cartDelivery.delivery_id}/> :
                            <div key="addressForm" className="border-gray-300 border-2 rounded-lg">
                                <AddressForm
                                    submitData={handleAddressData}
                                    title="Dane do wysyłki"
                                    description="Podaj dane, na które wyślemy twoje zakupy"
                                    city={""}
                                    email={""}
                                    house={""}
                                    name={""}
                                    post_code={""}
                                    street={""}
                                    surname={""}
                                />
                            </div>
                    : ""
                    )
                })
            }
        </div>
        </>
    )
}

export default DeliveryBox