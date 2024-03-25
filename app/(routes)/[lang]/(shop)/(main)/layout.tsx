import {Fragment, ReactElement} from 'react'

export const metadata = {
    title: 'LitStore',
}

export default function ShopLayout({children}:{children: ReactElement}) {
    return (
        <div>
            <div style={{height: "64px"}} className={""}></div>
            <div className={"md:m-6 lg:m-12"}>
                {children}
            </div>
        </div>
    )
}