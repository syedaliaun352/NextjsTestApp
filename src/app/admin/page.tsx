'use client'

import React, { useContext, useState } from 'react'
import { GlobalContext } from '../GlobalContext'
import Link from 'next/link'

export default function Admin() {
    const { githubUser, firebaseUser, websiteName, setWebsiteName } = useContext(GlobalContext)
    const [newSiteName, setNewSiteName] = useState(websiteName)

    if (!githubUser && !firebaseUser) {
        return (
            <div className="m-10 p-2 text-5xl bg-transparent text-white flex flex-col items-center justify-center">
                <h1 className="drop-shadow-lg">Access Denied</h1>
                <h2 className="mt-2 drop-shadow-md">
                    <Link href="/auth/login" className="group relative inline-block">
                        <span className="text-teal-500">Click here to login</span>
                        <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-teal-500 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                </h2>
            </div>
        )
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        setWebsiteName(newSiteName)
    }

    return (
        <div className="m-2 p-4 bg-gray-900 text-white flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold mb-4 drop-shadow-lg">Admin Panel</h1>
            <h2 className="text-xl mb-2 drop-shadow-md">Change Site Name:</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    value={newSiteName}
                    onChange={e => setNewSiteName(e.target.value)}
                    className="w-2xl p-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                    type="submit"
                    className="px-4 py-2 duration-300 cursor-pointer bg-teal-500 hover:bg-teal-600 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                    Update
                </button>
            </form>
        </div>
    )
}
