'use client'

import React, { createContext, useState } from 'react'

export const GlobalContext = createContext<any | undefined>(undefined);



export default function GlobalState({ children }: any) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<any>(null)
    return (
        <GlobalContext.Provider value={{
            isLoading: isLoading,
            setIsLoading: setIsLoading,
            error: error,
            setError: setError,
        }}>{children}</GlobalContext.Provider>
    )
}
