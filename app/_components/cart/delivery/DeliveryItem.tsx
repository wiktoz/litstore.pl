interface Props {
    delivery: Delivery,
    isPicked: boolean,
    pickDelivery: (id:string) => void
}

const DeliveryItem = ({delivery, isPicked, pickDelivery}:Props) => {
    return(
        <div key={delivery._id} onClick={() => pickDelivery(delivery._id)}
             className={"w-full lg:w-1/3 h-32 items-center flex flex-row px-2 py-6 rounded-lg hover:cursor-pointer "
            + (isPicked ? "bg-gray-50 border-gray-300 border-2" : "border-gray-300 border")}>
            <div className='px-4'>
                <img src={"/img/delivery/" + delivery.img} className="w-20" alt={delivery.name}/>
            </div>
            <div className='flex flex-col self-center px-2'>
                <p className='font-semibold text-sm'>{delivery.name}</p>
                <p className='text-xs text-gray-500'>
                    {delivery.price} PLN
                </p>
            </div>
        </div>
    )
}

export default DeliveryItem