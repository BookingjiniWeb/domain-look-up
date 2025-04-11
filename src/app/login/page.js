'use client';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        toast.error('❗ Please enter email and password.');
        return;
      }

      const res = await axios.post('/api/login', { email, password });

      if (res.data.success) {
        const { name } = res.data.user;
        Cookies.set('userName', name, { expires: 7 });
        toast.success(`🎉 Welcome back, ${name}!`);
        router.push('/washify');
      }
    } catch (err) {
      toast.error('❌ Login failed. Please check your credentials.');
    }
  };

  return (
    <>
                <a
                href="https://t.me/+MnhJy9KSj9s1MjQ1"
                target="_blank"
                className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out"
            >

                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M9.033 16.928s-.353.016-.521-.18c-.163-.188-.153-.538-.153-.538l.353-2.365 7.838-7.063c.322-.288-.07-.45-.498-.265L6.29 11.347l-2.252-.7c-.49-.15-.5-.49.1-.727L20.103 3.36c.436-.177.817.105.672.765L17.758 19.77c-.093.475-.377.59-.763.367l-3.826-2.827-1.842 1.783z" />
                </svg>

                Join our Telegram
            </a>
    
    
  
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-100 to-pink-100 px-4">
      <div className="bg-white p-6 md:p-10 rounded-3xl shadow-2xl w-full max-w-md transition-all duration-300">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md mb-2">
            🔐
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-1">Please log in to continue</p>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="✉️ Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
          />
          <input
            type="password"
            placeholder="🔒 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all"
          >
            🚪 Log In
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/washify" className="text-blue-600 underline hover:text-indigo-500">
            Enter Washroom
          </Link>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>

    </>
  );
}
