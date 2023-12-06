import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import connect from "./utils/db/connect";
import User from "./models/user";
import bcrypt from "bcryptjs"


export const {
    handlers: { GET, POST },
    auth,
} = NextAuth({
    providers: [CredentialsProvider({
        async authorize(credentials) {
            await connect()

            const result = await User.findOne({email: credentials.email});

            if (!result) {
                throw new Error('No user found with this email')
            }

            const checkPassword = await bcrypt.compareSync(credentials.password, result.password)
            if (!checkPassword) {
                throw new Error('Incorrect password')
            }

            return { id: result._id, role: result.role };
        },
    }),
    ],
    pages: {
        signIn: '/auth/signin',
        signUp: '/auth/signup',
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, token }){
            if (session?.user) {
                session.user.id = token.id
                session.user.role = token.role
            }
            return session
        },
        async jwt({ user, token }){
            if (user?.role) {
                token.role = user.role
                token.id = user.id
            }
            return token
        },
        async authorized({ req, token }){
            return token !== null
        }
    }
})