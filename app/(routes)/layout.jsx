import { Fragment } from 'react'
import Navbar from '/app/_components/Navbar'
import Footer from '/app/_components/Footer'
import Transition from '/app/_components/layout/Transition'
import {SessionProvider} from "/app/_components/providers/SessionProvider"
import "/app/_styles/globals.css"
import {ShoppingCartProvider} from "/app/_context/ShoppingCart"

export const metadata = {
    title: 'LitStore.',
}

export default function ShopLayout({children}) {
    return (
        <html>
        <SessionProvider>
            <ShoppingCartProvider>
                <Fragment>
                    <body>
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

                        <Footer/>
                        </Transition>
                    </div>
                    </body>
                </Fragment>
            </ShoppingCartProvider>
        </SessionProvider>
        </html>
    )
}