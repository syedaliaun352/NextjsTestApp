'use client'

import { GoogleGenerativeAI } from '@google/generative-ai';
import { useContext, useState } from 'react';
import { GlobalContext } from '../GlobalContext';

export default function Chatbot() {
    const [messages, setMessages] = useState<Array<{ text: string, isUser: boolean }>>([]);
    const [input, setInput] = useState('');
    const genai = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_APIKEY || '');
    const model = genai.getGenerativeModel({ model: 'gemini-pro' });
    const { isLoading, setIsLoading } = useContext(GlobalContext);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!input.trim()) return;

        try {
            setMessages(prev => [...prev, { text: input, isUser: true }]);
            setInput('');
            setIsLoading(true);

            const result = await model.generateContent(input);
            const response = result.response;
            setMessages(prev => [...prev, { text: response.text(), isUser: false }]);

        } catch (error) {
            setMessages(prev => [...prev, { text: 'Something went wrong', isUser: false }]);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='max-w-lg max-h-auto mx-auto p-4'>
            <h1 className='text-3xl font-bold text-white text-center mb-4 border-b-2 border-teal-500 m-2 p-2'>ChatBot</h1>
            <div className='h-96 overflow-y-auto mb-4 bg-gray-800 rounded-lg p-4'>
                {messages.map((message, index) => (
                    <div key={index} className={`mb-3 ${message.isUser ? 'text-right' : 'text-left'}`}>
                        <div className={`inline-block p-3 rounded-lg ${message.isUser
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-700 text-white'
                            }`}>
                            {message.text}
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className='flex gap-2'>
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder='Enter your message'
                    className='flex-1 p-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500'
                />
                <button
                    type='submit'
                    disabled={isLoading || !input.trim()}
                    className='px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50'
                >
                    {isLoading ? 'Sending...' : 'Send'}
                </button>
            </form>
        </div>
    )
}