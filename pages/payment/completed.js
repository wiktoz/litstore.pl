import sha256 from 'crypto-js/sha256'
import ProductsOrder from '../../components/ProductsOrder'
import useSWR from 'swr'
import Loader from '../../components/Loader'

export const getServerSideProps = async (context) => {
    const PAYMENT_KEY = process.env.PAYMENT_KEY

    const hashFields = {
        "ServiceID": context.query.ServiceID,
        "OrderID": context.query.OrderID
    }

    const hash = sha256(Object.values(hashFields).join('|') + "|" + PAYMENT_KEY).toString()

    if(hash !== context.query.Hash){
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
        }
    }

    const orderID = context.query.OrderID

    return { props: { orderID } }
}

const getColor = (status) => {
    if(status === "PENDING") return "text-orange-500"
    if(status === "SUCCESS") return "text-green-500"
    if(status === "FAILURE") return "text-red-800"
    return "text-black"
}

const formatDate = (date) => {
    return new Date(date).toLocaleString("pl-PL", {dateStyle: 'medium', timeStyle: 'short'});
}

const fetcher = url => fetch(url).then(r => r.json())

const PaymentCompleted = ({orderID}) => {
    const { data: order, error} = useSWR(orderID ? '/api/orders/' + orderID : null, fetcher)

    if(error) return "An error has occured"
    if(!order) return <Loader />

    return(
        <div>
            <div className='my-10 text-center w-auto'>
                <p className="font-bold text-3xl mb-2">Order completed</p>
                <div className="text-sm mb-8">
                    <p>
                        Your order #{order._id} has been completed.
                    </p>
                    { order?.payment.status == "SUCCESS" ?
                        <p>
                            Payment completed.
                        </p>
                        :
                        <p>
                            Waiting for payment to be processed.
                        </p>
                    }
                </div>
                <p className='text-right text-xs'>
                    Order placed
                    <span className='ml-1'>
                        {formatDate(order?.date)}
                    </span>
                </p>
                <p className="text-sm mb-4 text-right">
                    <span className='mr-1 text-xs'>
                        payment
                    </span>
                    <span className={"font-bold " + getColor(order?.payment.status)}>
                        {order?.payment.status}
                    </span>
                </p>
            </div>
            <ProductsOrder products={order?.items}/>
            <section className='grid grid-cols-12 rounded my-4 bg-gray-50 text-gray-700 text-sm'>
                    <div className="col-span-6 px-6 py-10">
                        <p className='font-bold mb-2'>Invoice data</p>
                        <p>{order?.buyer.name} {order?.buyer.surname}</p>
                        <p>{order?.buyer.street}</p>
                        <p>{order?.buyer.postcode} {order?.buyer.city}</p>
                    </div>
                    <div className='col-span-6 flex flex-row items-center'>
                        <div>
                        </div>
                        <div className="px-6">
                            <p className='font-bold mb-2'>Delivery method <span className='font-normal text-xs'>(+{order?.delivery?.price} PLN)</span></p>
                            <img className='w-24 my-4' src={"/img/delivery/" + order?.delivery?.id.img} />
                        </div>
                    </div>
                </section>
        </div>
    )
}

export default PaymentCompleted