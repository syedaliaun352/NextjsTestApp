import { SessionProvider } from 'next-auth/react'
import React from 'react'
import Dashboard from './dashboard'

export default function Admin() {
    return (
        <>
            <SessionProvider>
                <Dashboard />
            </SessionProvider>
        </>
    )
}
