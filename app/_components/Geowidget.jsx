import Script from 'next/script'
import Head from 'next/head'
import {useEffect, useState} from "react"
import useShoppingCart from "../context/ShoppingCart";

const Geowidget = ({id}) => {
    const inpostToken = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkVzROZW9TeXk0OHpCOHg4emdZX2t5dFNiWHY3blZ0eFVGVFpzWV9TUFA4In0.eyJleHAiOjE5OTc2MDg0NDUsImlhdCI6MTY4MjI0ODQ0NSwianRpIjoiZTFlNGU4OTAtYjBhZC00ZjlkLTk3YzUtZDJlNjM4NzRiMWE0IiwiaXNzIjoiaHR0cHM6Ly9zYW5kYm94LWxvZ2luLmlucG9zdC5wbC9hdXRoL3JlYWxtcy9leHRlcm5hbCIsInN1YiI6ImY6N2ZiZjQxYmEtYTEzZC00MGQzLTk1ZjYtOThhMmIxYmFlNjdiOmI5bHhxQ0YteXJSeDR0VThFdWJTV0EiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzaGlweCIsInNlc3Npb25fc3RhdGUiOiJiMDhjZTkzOC01Njc5LTQyYTAtYTE0MC0zNDQwYTkwMzE1MzciLCJzY29wZSI6Im9wZW5pZCBhcGk6YXBpcG9pbnRzIiwic2lkIjoiYjA4Y2U5MzgtNTY3OS00MmEwLWExNDAtMzQ0MGE5MDMxNTM3IiwiYWxsb3dlZF9yZWZlcnJlcnMiOiIiLCJ1dWlkIjoiOTg2NDlmNDQtYWI2Zi00MjQ2LTkxMDQtMmJiNjEyMjZiNmYxIn0.Fs7TsC33Lh3gZRAzhvssc2FwTYVEQrUsLy0pEeAB_btdVPAcuDfhegRx7QsXuUgax-AaIEW-7gSJby6gQ7PVsGpFfgvY1tC3dYxbXfmGztIkeKKq59xES5rftksp4Gycz9vxGx9qP14nR4dTSN8a6TcVql64yErYZldqAzC_-Z8DkHOPvktKvb-oMASIaMM2z0zE62WX0gV5O3Q_zIJwDK3wZSl8bXHgQCSiC4Axlcz-6aA_Cc96bYTfhEtcrdIpz2KnFqHfS7zvBqNzaVIwRhUxzwq5kyX7N8MV4oXplsVsPUoR7DHAE1joM3Ift-xrsPKIA8IqPmQiT94F9ZC6TA"

    const [selectedInPost, setSelectedInPost] = useState(null)
    const { setDelivery, cartDelivery } = useShoppingCart()

    useEffect(() => {
        cartDelivery.id === id && cartDelivery?.data?.name ? setSelectedInPost({
            name: cartDelivery.data.name,
            address: {
                line1: cartDelivery.data.street,
                line2: cartDelivery.data.postcode + " " + cartDelivery.data.city
            }
        }) : null
    }, [])

    const resetSelection = () => {
        setSelectedInPost(null)
    }

    const afterPointSelected = ({detail}) => {
        setSelectedInPost(detail)
        setDelivery(id, {
            name: detail.name,
            street: detail.address_details.street + " " + detail.address_details.building_number,
            postcode: detail.address_details.post_code,
            city: detail.address_details.city
        })
    }

    useEffect(() => {
        window.addEventListener("afterPointSelected", afterPointSelected)
    })

    return (
        <div className="py-2">
            {
                selectedInPost ?
                    <div className="w-full items-center justify-between flex flex-row px-10 py-6 rounded-lg border-gray-300 border-2">
                        <div className="flex flex-row items-center gap-7">
                            <div>
                                <img src={"/img/delivery/inpost.svg"} className="w-20" />
                            </div>
                            <div>
                                <p className="font-semibold text-md mb-1">Wybrany paczkomat</p>
                                <div className="text-sm text-gray-800">
                                    <p>{selectedInPost.name}</p>
                                    <p>{selectedInPost.address.line1}</p>
                                    <p>{selectedInPost.address.line2}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button onClick={resetSelection} className="rounded bg-gray-700 text-sm px-6 py-2 text-white mt-4 hover:bg-gray-500">Zmień</button>
                        </div>
                    </div>
                    :
                    <div className="h-screen">
                        <Head>
                            <link rel="stylesheet" href="https://sandbox-easy-geowidget-sdk.easypack24.net/inpost-geowidget.css"/>
                        </Head>

                        <Script src='https://sandbox-easy-geowidget-sdk.easypack24.net/inpost-geowidget.js' strategy="lazyOnload" />
                        <inpost-geowidget onpoint="afterPointSelected" token={inpostToken} language='pl'  config='parcelCollect'></inpost-geowidget>
                    </div>
            }
        </div>
    )
}

export default Geowidget