'use client'

import { useState, useEffect } from 'react';

export default function DesktopNotification() {
    const [message, setMessage] = useState('');
    const [permission, setPermission] = useState('checking...');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!('Notification' in window)) {
            setPermission('not supported');
        } else {
            setPermission(Notification.permission);
        }
    }, []);

    const sendNotification = async () => {
        if (!('Notification' in window)) {
            alert('This browser does not support desktop notifications.');
            return;
        }

        if (!message.trim()) {
            alert('Please enter a message.');
            return;
        }

        setLoading(true);

        if (Notification.permission !== 'granted') {
            const perm = await Notification.requestPermission();
            setPermission(perm);
            if (perm !== 'granted') {
                alert('Permission for notifications was denied.');
                setLoading(false);
                return;
            }
        }

        new Notification('New Message', { body: message });
        setMessage('');
        setLoading(false);
    };

    return (
        <div className="bg-transparent flex items-center justify-center p-4 m-2">
            <div className="w-full max-w-md space-y-6 p-8 bg-gray-900 rounded-lg shadow-xl">
                <h1 className="text-2xl font-bold text-white text-center">
                    Send Browser Notification
                </h1>
                <div className="space-y-4">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter your message"
                        className="w-full px-4 py-2 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={loading}
                    />
                    <button
                        onClick={sendNotification}
                        disabled={loading}
                        className={`w-full px-4 py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200 ${loading
                            ? 'bg-blue-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        {loading ? 'Sending...' : 'Send Notification'}
                    </button>
                </div>
                <p className="text-sm text-gray-400 text-center">
                    Current permission status: {permission}
                </p>
            </div>
        </div>
    );
}
