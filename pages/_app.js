import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'
import ShopLayout from "../components/layout/shop"
import AdminLayout from "../components/layout/admin"
import { ShoppingCartProvider } from "../context/ShoppingCart"

function MyApp({ Component, pageProps: { session, ...pageProps }, router }) {
  const getLayout =
        router.pathname.includes('/admin') ? ((page) => <AdminLayout children={page} />)
        : ((page) => <ShopLayout children={page} />);
  
  return (
    <>
      {<SessionProvider session={session}><ShoppingCartProvider>{getLayout(<Component {...pageProps} />, pageProps)}</ShoppingCartProvider></SessionProvider>}
    </>
  )
}

export default MyApp
