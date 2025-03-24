'use client';

import React, { useState, useEffect, useContext } from 'react';
import { firebasePhoneVerifyCode, useFirebaseAuth } from './../../firebase';
import { ConfirmationResult } from 'firebase/auth';
import { GlobalContext } from '@/app/GlobalContext';

export default function PhoneVerify() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
    const [message, setMessage] = useState('');
    const { error, setError } = useContext(GlobalContext);
    const { firebasePhoneRegister, appVerifier } = useFirebaseAuth();

    useEffect(() => {
    }, []);

    const handleSendCode = async () => {
        if (!appVerifier) {
            setError('Recaptcha Verifier not initialized. Please try again.');
            return;
        }
        try {
            setError(null);
            const result = await firebasePhoneRegister(phoneNumber);
            setConfirmationResult(result);
            setMessage('Verification code sent! Please check your phone.');
        } catch (err: any) {
            setError(err.message || 'Error sending verification code.');
        }
    };

    const handleVerifyCode = async () => {
        if (!confirmationResult) {
            setError('Please send the code first.');
            return;
        }
        try {
            setError(null);
            const user = await firebasePhoneVerifyCode(confirmationResult, verificationCode);
            setMessage('Phone number verified successfully!');
            console.log('Verified user:', user);
        } catch (err: any) {
            setError(err.message || 'Error verifying code.');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Phone Verification</h2>
            <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium">
                    Phone Number:
                </label>
                <input
                    id="phone"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+1234567890"
                    className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                    onClick={handleSendCode}
                    className="mt-2 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-colors"
                    disabled={!appVerifier}
                >
                    Send Code
                </button>
                {!appVerifier && <p className="text-yellow-500 text-sm mt-1">Recaptcha loading...</p>}
            </div>
            {confirmationResult && (
                <div className="mb-4">
                    <label htmlFor="code" className="block text-sm font-medium">
                        Verification Code:
                    </label>
                    <input
                        id="code"
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder="Enter code"
                        className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                    <button
                        onClick={handleVerifyCode}
                        className="mt-2 w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md font-medium transition-colors"
                    >
                        Verify Code
                    </button>
                </div>
            )}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
            <div id="sign-in-button" style={{ position: 'absolute', top: '-9999px', left: '-9999px' }} /> {/* Invisible reCAPTCHA div */}
        </div>
    );
}