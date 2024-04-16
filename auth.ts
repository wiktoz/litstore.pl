import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import {JWT} from "@auth/core/jwt";
import {Session, User} from "@auth/core"

export const {
    handlers: { GET, POST },
    auth,
} = NextAuth({
    providers: [CredentialsProvider({
        credentials: {
            email: { label: 'email', type: 'text' },
            password: { label: 'password', type: 'password' },
        },
        async authorize(credentials) {
            if (!credentials) throw new Error("No credentials to log in")

            const {email, password} = credentials

            const url = "http://localhost:3000/api/auth/login"
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email: email, password: password})
            })

            const result = await response.json()

            if(!result.success)
                throw new Error(result.error)

            return { id: result.user._id, role: result.user.role || "user" }
        },
    }),
    ],
    pages: {
        signIn: '/auth/signin',
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }:{token: JWT, user: User}) {
            if (user) { // User is available during sign-in
                token.id = user.id
                token.role = user.role
            }
            return token
        },
        async session({ session, token }:{session: Session, token: JWT}) {
            session.user.id = token.id
            session.user.role = token.role
            return session
        },
        async authorized({auth}:{auth:any}){
            return auth?.user !== null
        }
    }
})