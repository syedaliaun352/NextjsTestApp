'use client'

import { User } from 'firebase/auth'
import { useSession } from 'next-auth/react'
import React, { createContext, useState, useMemo, useEffect } from 'react'
import { onAuthStateChange } from './firebase'

export const GlobalContext = createContext<any | undefined>(undefined)

export default function GlobalState({ children }: any) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<any>(null)
    const [firebaseUser, setFirebaseUser] = useState<User | null>(null)
    const { data: githubUser } = useSession()
    const [websiteName, setWebsiteName] = useState("Syed Ali Aun")

    useEffect(() => {
        const unsubscribe = onAuthStateChange((user: any) => {
            setFirebaseUser(user)
        })
        return unsubscribe
    }, [])

    const value = useMemo(
        () => ({
            isLoading,
            setIsLoading,
            error,
            setError,
            githubUser,
            firebaseUser,
            setFirebaseUser,
            websiteName,
            setWebsiteName
        }),
        [isLoading, error, githubUser, firebaseUser, websiteName]
    )

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}
