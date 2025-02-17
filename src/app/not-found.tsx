import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-transparent text-white flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">404: Not Found</h1>
            <p className="text-lg mb-6">The page you are looking for could not be found.</p>
            <Link href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Go back home
            </Link>
        </div>
    );
}