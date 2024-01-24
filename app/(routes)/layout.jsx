import "/app/_styles/globals.css"
import {SessionProvider} from "@/components/providers/SessionProvider"

export default function RootLayout({ children }) {
    return (
        <SessionProvider>
            <html lang="en">
                <body>{children}</body>
            </html>
        </SessionProvider>
    )
}