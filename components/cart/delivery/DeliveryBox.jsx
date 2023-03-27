import useSWR from "swr"
import DeliveryItem from './DeliveryItem'
import useShoppingCart from "../../../context/ShoppingCart"
import Loader from "../../Loader"
import Geowidget from '../../Geowidget'
import AddressForm from "../../form/AddressForm"

const fetcher = url => fetch(url).then(r => r.json())

const DeliveryBox = () => {
    const { data: deliveries, error} = useSWR('/api/deliveries/active', fetcher)
    const { cartDelivery, setDelivery } = useShoppingCart()
    
    if(error) return "An error has occured"
    if(!deliveries) return <Loader />

    const pickDelivery = (e, id) => {
        e.preventDefault()

        setDelivery(id, cartDelivery.data)
    }

    const handleAddressData = (data) => {
        if(cartDelivery && cartDelivery.id){
            setDelivery(cartDelivery.id, data)
        }
    }

    return(
        <>
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
                            pickDelivery={ e => { pickDelivery(e, item._id) }}
                        />
                    )
                })
            }
        </div>
        <div className="w-full h-full">
            {
                deliveries.map(item => {
                    return (
                    cartDelivery && cartDelivery.id == item._id ?
                        item.name == "InPost" ?
                            <Geowidget key="InPostGeowidget"/> : <AddressForm submitData={handleAddressData}/>
                            : ""
                    )
                })
            }
        </div>
        </>
    )
}

export default DeliveryBox