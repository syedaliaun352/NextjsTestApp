'use client'
import React, { useState } from 'react'
import QRCode from 'react-qr-code'

export default function Qr() {
    const [value, setValue] = useState("")
    return (
        <div className="bg-transparent flex flex-col items-center justify-center m-2 p-2">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-6">
                    QR Code Generator
                </h1>

                <input
                    type="text"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder="Enter URL or text..."
                    className="w-full px-4 py-3 rounded-lg bg-transparent text-white placeholder-gray-400
                           focus:outline-none focus:ring-1 focus:ring-purple-500
                           transition-all duration-300 shadow-lg border-2 border-purple-600"
                />

                {value && (
                    <div className="p-4 mt-6 border-4 border-teal-500 duration-300">
                        <QRCode
                            value={value}
                            size={256}



                        />
                    </div>
                )}
            </div>
        </div>
    )
}