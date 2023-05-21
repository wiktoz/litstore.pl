const DeliveryItem = ({id, name, img, price, isPicked, pickDelivery}) => {
    return(
        <div key={id} onClick={(e) => pickDelivery(e, id)} className={"w-full lg:w-1/3 h-32 items-center flex flex-row px-2 py-6 rounded-lg hover:cursor-pointer " + (isPicked ? "bg-gray-50 border-gray-300 border-2" : "border-gray-300 border")}>
            <div className='px-4'>
                <img src={"/img/delivery/" + img} className="w-20" />
            </div>
            <div className='flex flex-col self-center px-2'>
                <p className='font-semibold text-sm'>{name}</p>
                <p className='text-xs text-gray-500'>
                    {price} PLN
                </p>
            </div>
        </div>
    )
}

export default DeliveryItem