/*
  @import Providers
*/
import { SessionProvider } from "next-auth/react"
import { ShoppingCartProvider } from "../context/ShoppingCart"

/*
  @import Layouts
*/
import ShopLayout from "../components/layout/shop"
import AdminLayout from "../components/layout/admin"

/*
  @import Styles
*/
import '../styles/globals.css'
import '../styles/inpost.css'

function MyApp({ Component, pageProps: { session, ...pageProps }, router }) {
  const getLayout =
        router.pathname.includes('/admin') ? ((page) => <AdminLayout children={page} />)
        : ((page) => <ShopLayout children={page} />)
  
  return (
    <>
      {
        <SessionProvider session={session}>
          <ShoppingCartProvider>
            {
              getLayout(<Component {...pageProps} />, pageProps)
            }
          </ShoppingCartProvider>
        </SessionProvider>}
    </>
  )
}

export default MyApp
