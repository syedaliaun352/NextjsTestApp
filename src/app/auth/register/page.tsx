'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { firebaseRegisterUser } from '@/app/firebase'

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<String | null>(null)
    const [message, setMessage] = useState('')
    const router = useRouter()

    const onSubmit = async (e: any) => {
        e.preventDefault()

        try {
            setIsLoading(true)
            await firebaseRegisterUser(email, password)
            setEmail('')
            setPassword('')
            setMessage("User Created!")

        } catch (error: any) {
            setError(`ERROR: ${error.message}`)
            setMessage("")

        } finally {
            setIsLoading(false)

        }
    }
    return (
        <>
            <div className="m-2 p-2 mx-auto text-white flex flex-col items-center justify-center">
                <div>
                    <h1 className="text-5xl p-2">Register</h1>
                </div>
                <div className="w-full max-w-lg">
                    <form action="" onSubmit={onSubmit} className="mt-10 bg-gradient-to-r from-gray-900 to-gray-950 flex flex-col mx-auto p-5 rounded-2xl border border-green-500 shadow-md">
                        <label htmlFor="email" className="text-3xl p-2">Email:</label>
                        <input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type="email"
                            name="email"
                            required
                            placeholder="Enter Email"
                            className="p-2 w-full rounded border border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <label htmlFor="password" className="text-3xl p-2 mt-4">Password:</label>
                        <input
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                            name="password"
                            required
                            placeholder="Enter Password"
                            className="p-2 w-full rounded border border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <button disabled={isLoading} type="submit" className={`${isLoading ? 'bg-gray-700' : 'bg-green-500'} mt-6 duration-300 cursor-pointer hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-300`}>
                            {isLoading ? 'Loading...' : 'Register'}
                        </button>
                        <div>
                            <h1 className="duration-300 transition-all text-center text-4xl p-2 mt-2">{error ? error : message}</h1>
                        </div>
                        <div>
                            <p className='text-center'>
                                Already have a Account? <span className='text-blue-400 hover:text-blue-600 duration-300 cursor-pointer' onClick={() => router.push('/auth/login')}>Login Here</span>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>

    )
}
