'use client'

import { signIn } from 'next-auth/react'
import { logIn } from '@/app/firebase'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<String | null>(null)
    const [message, setMessage] = useState('')
    const router = useRouter()
    const [githubloading, setGithubLoading] = useState(false)

    const onSubmit = async (e: any) => {
        e.preventDefault()

        try {
            setIsLoading(true)
            await logIn(email, password)
            setEmail('')
            setPassword('')
            setMessage("Login successfully, Redirecting..")
            setTimeout(() => {
                router.push('/')
            }, 2000)
        } catch (error: any) {
            setError(error.message)
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleGithubSignIn = async () => {
        try {
            setGithubLoading(true)
            setMessage('Redirecting...')
            setTimeout(async () => {
                await signIn('github', { redirectTo: '/', redirect: true })
            }, 1500)
        } catch (error: any) {
            setError(error.message)
            console.error(error)
        } finally {
            setGithubLoading(false)
        }
    }

    return (
        <div className="m-2 p-2 mx-auto text-white flex flex-col items-center justify-center">
            <div>
                <h1 className="text-5xl p-2">Login</h1>
            </div>
            <div className="w-full max-w-lg">
                <div className="mt-10 bg-gradient-to-r from-gray-900 to-gray-950 flex flex-col mx-auto p-5 m-1 rounded-2xl border border-blue-500 shadow-md">
                    <form onSubmit={onSubmit}>
                        <label htmlFor="email" className="text-3xl p-2">Email:</label>
                        <input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type="email"
                            name="email"
                            required
                            placeholder="Enter Email"
                            className="mb-4 mt-1 p-2 w-full rounded border border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <label htmlFor="password" className="text-3xl p-2 mt-4">Password:</label>
                        <input
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                            name="password"
                            required
                            placeholder="Enter Password"
                            className="p-2 mt-1 w-full rounded border border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <button
                            disabled={isLoading || githubloading}
                            type="submit"
                            className={`${isLoading ? 'bg-gray-700' : 'bg-blue-500'} w-full mt-6 duration-300 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-300`}
                        >
                            {isLoading ? 'Loading...' : 'Login'}
                        </button>
                    </form>
                    <div className="mt-4">
                        <button
                            disabled={githubloading}
                            onClick={handleGithubSignIn}
                            className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            {githubloading ? 'Loading...' : 'Sign in with Github'}
                        </button>
                    </div>
                    <div>
                        <h1 className="duration-300 transition-all text-center text-4xl p-2 mt-2">
                            {error ? error : message}
                        </h1>
                    </div>
                    <div>
                        <p className='text-center'>
                            Forgot Password? <span className='text-purple-400 hover:text-purple-600 duration-300 cursor-pointer' onClick={() => router.push('/auth/reset')}>Reset Here</span>
                        </p>
                        <p className='text-center'>
                            Don't have an Account? <span className='m-1 text-green-400 hover:text-green-600 duration-300 cursor-pointer' onClick={() => router.push('/auth/register')}>Register Here</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
