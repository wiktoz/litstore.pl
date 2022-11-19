import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"
import dbConnect from '../../../utils/connectDb';
import User from '../../../models/user';
import { compare } from 'bcryptjs';

export default NextAuth({
    callbacks: {
        session: async ({ session, token }) => {
          if (session?.user) {
            session.user.role = token.role;
          }
          return session;
        },
        jwt: async ({ user, token }) => {
          if (user) {
            token.role = user.role;
          }
          return token;
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
                await dbConnect();
                
                const result = await User.findOne({
                    email: credentials.email,
                });
                if (!result) {
                    throw new Error('No user found with the email');
                }

                const checkPassword = await compare(credentials.password, result.password);
                if (!checkPassword) {
                    throw new Error('Password doesnt match');
                }

                return { email: result.email, role: result.role };
            },
        }),
    ],
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    }    
});