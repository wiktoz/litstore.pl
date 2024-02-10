import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import connect from "@/utils/db/connect";
import User from "@/models/user";
import bcrypt from "bcryptjs"

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

            const { email, password } = credentials
            await connect()

            const user = await User.findOne({email: email})

            if (!user) {
                throw new Error('No user found with this email')
            }

            if(!credentials.password) {
                throw new Error('No password provided')
            }

            // @ts-ignore
            const checkPassword = bcrypt.compare(password, user.password)
            if (!checkPassword) {
                throw new Error('Incorrect password')
            }

            return { id: user._id, role: user.role || "user" }
        },
    }),
    ],
    pages: {
        signIn: '/auth/signin',
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({session}){
            return session
        },
        async jwt({ token, user, session }){
            if (session && session.user?.role) {
                token.role = session.user.role
                token.id = session.user.id
            }
            return token
        },
        async authorized({auth}){
            return auth?.user !== null
        }
    }
})