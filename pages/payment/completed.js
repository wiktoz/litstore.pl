import sha256 from 'crypto-js/sha256'

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

    const res = await fetch('http://localhost:3000/api/orders/' + context.query.OrderID)
    const data = await res.json()

    if (!data.order){
        return {
            redirect: {
              permanent: false,
              destination: "/",
            },
          }
    }
    else return { props: { data } }
}

const PaymentCompleted = ({data}) => {
    return(
        <div>
            <p className="font-bold text-2xl">Thank you!</p>
        </div>
    )
}

export default PaymentCompleted