import {Fragment, ReactElement} from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Transition from '@/components/layout/Transition'

export const metadata = {
    title: 'LitStore',
}

export default function ShopLayout({children}:{children: ReactElement}) {
    return (
            <Fragment>
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
            </Fragment>
    )
}