import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"
import connect from '../../../utils/connectDb';
import User from '../../../models/user';
import { compare } from 'bcryptjs';

export default NextAuth({
    callbacks: {
        session: async ({ session, token }) => {
          if (session?.user) {
            session.user.role = token.role
          }
          return session
        },
        jwt: async ({ user, token }) => {
          if (user?.role) {
            token.role = user.role
          }
          return token
        },
    },
    //Configure JWT
    session: {
        jwt: true,
    },
    //Specify Provider
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                await connect()
                
                const result = await User.findOne({
                    email: credentials.email,
                });
                if (!result) {
                    throw new Error('No user found with this email')
                }

                const checkPassword = await compare(credentials.password, result.password)
                if (!checkPassword) {
                    throw new Error('Incorrect password')
                }

                return { email: result.email, role: result.role };
            },
        }),
    ],
    pages: {
        signIn: '/auth/signin',
        signUp: '/auth/signup',
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    }    
});