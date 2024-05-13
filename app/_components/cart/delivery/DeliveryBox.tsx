import useSWR from "swr"
import DeliveryItem from './DeliveryItem'
import { useShoppingCart } from "@/context/ShoppingCart"
import Loader from "@/components/Loader"
import AddressForm from "@/components/form/AddressForm"
import {fetcher} from "@/utils/helpers"
import Geowidget from "@/components/Geowidget";
import {id} from "postcss-selector-parser";

interface Props {
    submitData: (data: CartDeliveryInterface) => void
}

const DeliveryBox = ({submitData}:Props) => {
    const { data: deliveries, error} = useSWR('/api/deliveries', fetcher)
    const { cartDelivery, setDelivery } = useShoppingCart() as ShoppingCartContextType

    if(error) return "An error has occurred"
    if(!deliveries) return <Loader />

    const pickDelivery = (id:string) => {
        setDelivery({
            delivery_id: id,
            email: "",
            name: "",
            surname: "",
            city: "",
            house: "",
            post_code: "",
            street: ""
        })
    }

    const handleAddressData = (data: AddressInterface) => {
        if(cartDelivery && cartDelivery.delivery_id){
            const d = {
                delivery_id: cartDelivery.delivery_id,
                name: data.name,
                surname: data.surname,
                email: data.email,
                street: data.street,
                house: data.house,
                flat: data.flat,
                post_code: data.post_code,
                city: data.city
            }

            setDelivery(d)
            submitData(d)
        }
    }

    return(
        <>
        <div className='flex flex-col lg:flex-row gap-2'>
            {
                deliveries && deliveries.length > 0 &&
                deliveries.map((item:DeliveryInterface) => {
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
        <div className="w-full mt-4">
            {
                deliveries && deliveries.length > 0 &&
                deliveries.map((item: DeliveryInterface) => {
                    return (
                        <div key={"addressForm" + item._id}>
                        {
                            cartDelivery && cartDelivery.delivery_id === item._id &&
                            <div className="rounded-lg">
                                {
                                    item.name === "InPost" ?
                                        <Geowidget
                                            key="InPostGeowidget"
                                            submitData={handleAddressData}
                                        /> :

                                        <div className={"bg-gray-50 p-8 rounded-lg"}>
                                        <AddressForm
                                            submitData={handleAddressData}
                                            city={cartDelivery.city}
                                            email={cartDelivery.email}
                                            house={cartDelivery.house}
                                            name={cartDelivery.name}
                                            post_code={cartDelivery.post_code}
                                            street={cartDelivery.street}
                                            surname={cartDelivery.surname}
                                            disableOnSave={true}
                                            dataLocked={cartDelivery.name != ""}
                                        />
                                        </div>
                                }
                            </div>
                        }
                        </div>
                    )
                })
            }
        </div>
        </>
    )
}

export default DeliveryBox