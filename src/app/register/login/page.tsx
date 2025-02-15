'use client'

import { logIn } from '@/app/firebase'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<String | null>(null)
    const [message, setMessage] = useState('')
    const router = useRouter();

    const onSubmit = async (e: any) => {
        e.preventDefault()

        try {
            setIsLoading(true)
            await logIn(email, password)
            setEmail('')
            setPassword('')
            setMessage("User Logged In!, Redirecting..")
            setTimeout(() => {
                router.push('/')

            }, 2000);

        } catch (error: any) {
            setError(error.message)
            console.error(error)

        } finally {
            setIsLoading(false)
        }

    }

    return (
        <>
            <div className="m-2 p-2 mx-auto text-white flex flex-col items-center justify-center">
                <div>
                    <h1 className="text-5xl p-2">Login</h1>
                </div>
                <div className="w-full max-w-lg">
                    <form action="" onSubmit={onSubmit} className="mt-10 bg-gray-900 flex flex-col mx-auto p-5 rounded-2xl border border-blue-500 shadow-md">
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
                        <button disabled={isLoading} type="submit" className={`${isLoading ? 'bg-gray-700' : 'bg-blue-500'} mt-6 duration-300 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-300`}>
                            {isLoading ? 'Loading...' : 'Login'}
                        </button>
                        <div>
                            <h1 className="duration-300 transition-all text-center text-4xl p-2 mt-2">{error ? error : message}</h1>
                        </div>
                        <div>
                            <p className='text-center'>
                                Don't have a Account? <span className='text-green-400 hover:text-green-600 duration-300 cursor-pointer' onClick={() => router.push('/register')}>Register Here</span>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
