'use client'
import { useState, useEffect } from 'react'
import { Rubik_Glitch_Pop } from 'next/font/google'

const dancing = Rubik_Glitch_Pop({ weight: '400' })

export default function Clock() {
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    const pad = (n: any) => String(n).padStart(2, '0')
    const hours = pad(time.getHours() % 12 || 12)
    const minutes = pad(time.getMinutes())
    const seconds = pad(time.getSeconds())
    const ampm = time.getHours() >= 12 ? 'PM' : 'AM'

    return (
        <div className="flex justify-center items-center bg-transparent">
            <div className={`text-6xl font-black ${dancing.className} text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600`}>
                {`${hours}:${minutes}:${seconds}`} <span className="text-2xl">{ampm}</span>
            </div>
        </div>
    )
}
