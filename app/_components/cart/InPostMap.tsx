import Script from 'next/script'
import Head from 'next/head'
import { useEffect } from 'react'

const InPostMap = () => {
    useEffect(() => {
        // @ts-ignore
        window.easyPackAsyncInit = function () {
            // @ts-ignore
            easyPack.init({});
            // @ts-ignore
            const map = easyPack.mapWidget('easypack-map', function (point) {
                // @ts-ignore
                document.getElementById("inpost_data").value = JSON.stringify({
                    name: point.name,
                    street: point.address.line1,
                    postcode: point.address_details.post_code,
                    city: point.address_details.city
                })
            });
        }
    })

    return(
        <>
        <Head> 
            <link rel="stylesheet" href="https://geowidget.easypack24.net/css/easypack.css"/>
        </Head>
        <Script src='https://geowidget.easypack24.net/js/sdk-for-javascript.js' strategy="lazyOnload" />
 
        <div id="easypack-map"></div>
        
        </>
    )
}

export default InPostMap