import "/app/_styles/globals.css"
import { SessionProvider } from "next-auth/react"
import {ShoppingCartProvider} from "../_context/ShoppingCart"

export default function RootLayout({ children }) {
    return (
        <SessionProvider>
            <ShoppingCartProvider>
                <html lang="en">
                    <body>{children}</body>
                </html>
            </ShoppingCartProvider>
        </SessionProvider>
    )
}