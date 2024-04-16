import {Fragment, ReactElement} from 'react'

export const metadata = {
    title: 'LitStore',
}

export default function ShopLayout({children}:{children: ReactElement}) {
    return (
        <div>
            <div style={{height: "64px"}} className={""}></div>
            <div className={"m-4 md:m-6 lg:m-12 lg:my-8 min-h-96 flex"}>
                {children}
            </div>
        </div>
    )
}