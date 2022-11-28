import { withAuth } from "next-auth/middleware"

export default withAuth({
    callbacks: {
        authorized: ({ req, token }) => {
          const path = req.nextUrl.pathname
    
          if (path.startsWith("/admin")) {
            return token?.role === "admin"
          }

          return token !== null
        }
    }
})

export const config = { matcher: ["/admin/:path*", "/user/:path*"] }