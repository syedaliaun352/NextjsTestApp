'use client'
import Link from "next/link";
import { useContext, useState } from "react";
import { GlobalContext } from "../GlobalContext";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { websiteName } = useContext(GlobalContext);

    return (
        <header className="bg-transparent border-b-2 border-teal-500">
            <nav className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    <h1 className="text-white font-bold text-lg">{websiteName}</h1>

                    <div className="hidden md:flex gap-6">
                        <Link href="/" className="text-gray-300 hover:text-teal-500">Home</Link>
                        <Link href="/weather" className="text-gray-300 hover:text-teal-500">Weather</Link>
                        <Link href="/qr" className="text-gray-300 hover:text-teal-500">QR Code</Link>
                        <Link href="/chat" className="text-gray-300 hover:text-teal-500">ChatBot</Link>
                        <Link href="/colors" className="text-gray-300 hover:text-teal-500">Random Colors</Link>
                        <Link href="/todo" className="text-gray-300 hover:text-teal-500">Todo List</Link>
                        <Link href="/tictactoe" className="text-gray-300 hover:text-teal-500">TicTacToe</Link>
                        <Link href="/notification" className="text-gray-300 hover:text-teal-500">Notification</Link>
                        <Link href="/auth/register" className="text-gray-300 hover:text-teal-500">Register</Link>

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
                        <Link href="/" onClick={() => setIsOpen(false)} className="text-gray-300 py-2">Home</Link>
                        <Link href="/weather" onClick={() => setIsOpen(false)} className="text-gray-300 py-2">Weather</Link>
                        <Link href="/qr" onClick={() => setIsOpen(false)} className="text-gray-300 py-2">QR Code</Link>
                        <Link href="/chat" onClick={() => setIsOpen(false)} className="text-gray-300 py-2">ChatBot</Link>
                        <Link href="/colors" onClick={() => setIsOpen(false)} className="text-gray-300 py-2">Random Colors</Link>
                        <Link href="/todo" onClick={() => setIsOpen(false)} className="text-gray-300 py-2">Todo List</Link>
                        <Link href="/tictactoe" onClick={() => setIsOpen(false)} className="text-gray-300 py-2">TicTacToe</Link>
                        <Link href="/notification" onClick={() => setIsOpen(false)} className="text-gray-300 py-2">Notification</Link>
                        <Link href="/auth/register" onClick={() => setIsOpen(false)} className="text-gray-300 py-2">Register</Link>

                    </div>
                )}
            </nav>
        </header>
    );
}