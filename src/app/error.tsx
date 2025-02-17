'use client'

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: unknown; reset: () => void }) {
    useEffect(() => {
        console.error('Error occurred:', error);
    }, [error]);

    return (
        <div className="min-h-screen bg-transparent text-white flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
            {process.env.NODE_ENV === 'development' && (
                <p className="text-red-500 mb-4">
                    Error:{' '}
                    {error instanceof Error
                        ? (error as Error).message
                        : typeof error === 'string'
                            ? error
                            : JSON.stringify(error)}
                </p>
            )}
            <button
                onClick={() => reset()}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
                Try again
            </button>
        </div>
    );
}