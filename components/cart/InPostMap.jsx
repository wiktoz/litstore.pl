import Script from 'next/script'
import Head from 'next/head'
import { useState, useEffect } from 'react'

const InPostMap = () => {
    return(
        <>
        <Head> 
        <link rel="stylesheet" href="https://geowidget.easypack24.net/css/easypack.css"/>
        </Head>
        <Script src='https://geowidget.easypack24.net/js/sdk-for-javascript.js' strategy="lazyOnload" />
        <Script id="inpost-map">{
            window.easyPackAsyncInit = function () {
                easyPack.init({});
                var map = easyPack.mapWidget('easypack-map', function(point){
                    document.getElementById("inpost_data").value = JSON.stringify({name: point.name, street: point.address.line1, postcode: point.address_details.post_code, city: point.address_details.city})
                    //console.log({name: point.name, street: point.address.line1, postcode: point.address_details.post_code, city: point.address_details.city})
                });
            }
        }
        </Script>
 
        <div id="easypack-map"></div>
        
        </>
    )
}

export default InPostMap