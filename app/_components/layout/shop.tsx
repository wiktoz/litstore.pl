import {Fragment, ReactNode} from 'react'
import Head from 'next/head'
import Navbar from '../Navbar'
import Footer from '../Footer'
import Transition from './Transition'

export default function ShopLayout({children}:{children:ReactNode}) {
    return (
        <Fragment>
        <Head>
            <title>LitStore e-commerce solutions</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
            <div className="flex flex-col h-screen justify-between font-sans">
            <Navbar></Navbar>
            <Transition>
            <div className="container mx-auto mb-auto p-4 md:p-6 lg:p-8 grow bg-white">
                <div className="w-full h-full rounded">
                    <div className="container">
                        {children}
                    </div>
                </div>
            </div>

                <Footer></Footer>
            </Transition>
            </div>
        </Fragment>
    )
}