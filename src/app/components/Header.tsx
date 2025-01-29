import Link from "next/link";

export default function Header() {
    return (
        <>
            <header>
                <nav className="bg-transparent text-white p-4 border-b-2 border-teal-500">
                    <div className="container mx-auto flex flex-row justify-between items-center">
                        <div className="text-lg font-bold">Syed Ali Aun</div>
                        <ul className="hidden md:flex space-x-6">
                            <li className="hover:text-teal-500">
                                <Link href="/">Home</Link>

                            </li>
                            <li className="hover:text-teal-500">
                                <Link href="/weather">Weather</Link>
                            </li>
                            <li className="hover:text-teal-500">
                                <Link href="/form">Form</Link>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-400">
                                    Contact
                                </a>
                            </li>
                        </ul>
                        <button
                            className="md:hidden text-gray-400 hover:text-white focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </nav>
            </header>
        </>
    );
}
