'use client'
import { useState } from 'react'

interface WeatherLocation {
    name: string
    country: string
    localtime: string
}

interface WeatherCurrent {
    temp_c: number
    condition: {
        text: string
        icon: string
    }
}

interface WeatherData {
    location: WeatherLocation
    current: WeatherCurrent
}

export default function Weather() {
    const [city, setCity] = useState('Karachi')
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any>(null)

    async function getWeather() {
        try {
            setLoading(true)
            setError(null)
            const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY
            const weatherlink = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`

            const res = await fetch(weatherlink)
            if (!res.ok) throw new Error('Failed to fetch weather data')

            const datafromapi: WeatherData = await res.json()
            setData(datafromapi)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error occurred')
            setData(null)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex flex-col items-center justify-center p-2 m-2 text-white'>
            <h1 className='text-2xl font-bold'>Weather App</h1>
            <div className='flex flex-col items-center justify-center p-2 m-2'>
                <input
                    type="text"
                    placeholder='Enter City'
                    className='p-2 m-2 rounded border-2 border-teal-400 text-white'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button
                    onClick={getWeather}
                    className='p-2 m-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-500 transition-colors'
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Get Weather'}
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
            {data && (
                <div className='p-4 m-2 bg-black hover:animate-bounce border-4 rounded-tr-2xl rounded-bl-2xl border-b-teal-500 border-t-teal-500 border-r-red-500 border-l-red-500 drop-shadow-2xl shadow-2xl shadow-teal-500 text-center'>
                    <div className='flex items-center justify-center gap-2 mb-2'>
                        <img
                            src={data.current.condition.icon}
                            alt={data.current.condition.text}
                            className='w-14 h-14'
                        />
                        <h2 className='text-xl font-semibold'>{data.current.condition.text}</h2>
                    </div>
                    <div className='space-y-1'>
                        <p className='text-lg'>
                            <span className='font-medium'>Location:</span> {data.location.name}, {data.location.country}
                        </p>
                        <p className={data.current.temp_c > 30 ? 'text-lg text-red-500' : 'text-lg text-white'}>
                            <span className='font-medium'>Temperature:</span> {data.current.temp_c}°C
                        </p>
                        <p className='text-lg'>
                            <span className='font-medium'>Local Time:</span> {new Date(data.location.localtime).toLocaleTimeString()}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}