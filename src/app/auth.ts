import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub],
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/register',
        error: '/auth/error'
    },
    trustHost: true,
    useSecureCookies: false,
})