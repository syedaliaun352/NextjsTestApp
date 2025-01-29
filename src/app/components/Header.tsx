'use client'
import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-transparent border-b border-teal-500">
            <nav className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    <h1 className="text-white font-bold text-lg">Syed Ali Aun</h1>

                    <div className="hidden md:flex gap-6">
                        <Link href="/" className="text-gray-300 hover:text-teal-500">Home</Link>
                        <Link href="/weather" className="text-gray-300 hover:text-teal-500">Weather</Link>
                        <Link href="/qr" className="text-gray-300 hover:text-teal-500">QR Code</Link>
                    </div>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-gray-300 hover:text-teal-500"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {isOpen && (
                    <div className="md:hidden mt-2 flex flex-col gap-2">
                        <Link href="/" className="text-gray-300 py-2">Home</Link>
                        <Link href="/weather" className="text-gray-300 py-2">Weather</Link>
                        <Link href="/qr" className="text-gray-300 py-2">QR Code</Link>
                    </div>
                )}
            </nav>
        </header>
    );
}