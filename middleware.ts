import createMiddleware from 'next-intl/middleware'
import { auth } from "./auth"
import {NextRequest, NextResponse} from "next/server";

const intlMiddleware = createMiddleware({
    // A list of all locales that are supported
    locales: ['en', 'de', 'fr'],

    // Used when no locale matches
    defaultLocale: 'en'
});

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.includes('/admin')) {
        const session = await auth()

        const url = request.nextUrl.clone()
        url.pathname = '/'

        if(!session)
            return NextResponse.redirect(url)

        if(!session.user){
            return NextResponse.redirect(url)
        }

        // @ts-ignore
        if(session.user.role !== "admin")
            return NextResponse.redirect(url)
    }

    if (request.nextUrl.pathname.includes('/user')) {
        const session = await auth()

        const url = request.nextUrl.clone()
        url.pathname = '/'

        if(!session)
            return NextResponse.redirect(url)

        if(!session.user){
            return NextResponse.redirect(url)
        }
    }

    return intlMiddleware(request)
}

export const config = {
    matcher: [
        '/((?!api|_next|_vercel|.*\\..*).*)',
    ]
};