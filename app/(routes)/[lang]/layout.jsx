import "/app/_styles/globals.css"
import { SessionProvider } from "next-auth/react"
import dynamic from "next/dynamic";

const CartProvider = dynamic(
    () => import("/app/_context/ShoppingCart").then((ctx) => ctx.default),
    {
        ssr: false,
    }
)

export default function RootLayout({ children, params: {locale} }) {
    return (
        <html lang={locale}>
            <body>
                <SessionProvider>
                    <CartProvider>
                        {children}
                    </CartProvider>
                </SessionProvider>
            </body>
        </html>
    )
}