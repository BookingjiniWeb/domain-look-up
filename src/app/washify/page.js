'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

export default function Home() {
  const [name, setName] = useState('');
  const [type, setType] = useState('Toilet');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userNameFromCookie = Cookies.get('userName');

    if (userNameFromCookie) {
      setName(userNameFromCookie);
      toast.success(`Hey ${userNameFromCookie}! Good to see you again 👋`, {
        toastId: 'welcome-toast',
      });
    } else {
      toast.error('⚠️ Please log in first.');
    }

    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const res = await axios.get('https://shitansu.app.n8n.cloud/webhook/status');
      setStatus(res.data);
    } catch {
      toast.error('⚠️ Could not fetch status.');
    }
  };

  const occupy = async () => {
    if (!name.trim()) return toast.warning('❗ Login required.');

    setLoading(true);
    try {
      const res = await axios.post('https://shitansu.app.n8n.cloud/webhook/occupy', {
        occupiedBy: name,
        type: type,
        timestamp: new Date().toLocaleString()
      });
      toast.success(res.data.message);
      fetchStatus();
    } catch (err) {
      const data = err.response?.data;
      toast.error(data?.message || '🚫 Already occupied.');
    } finally {
      setLoading(false);
    }
  };

  const free = async () => {
    if (!name.trim()) return toast.warning('❗ Login required.');

    setLoading(true);
    try {
      const res = await axios.post('https://shitansu.app.n8n.cloud/webhook/free', {
        freedBy: name
      });
      toast.success(res.data.message);
      fetchStatus();
    } catch (err) {
      const data = err.response?.data;
      toast.error(data?.message || '🚫 Unauthorized.');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 via-purple-100 to-indigo-100 p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-indigo-700">🧼 Washroom Manager</h2>
          <Link
            href="/login"
            className="text-sm text-blue-600 hover:underline bg-blue-100 px-4 py-1 rounded-full"
          >
            Login
          </Link>
        </div>

        {/* Status Display */}
        <div className={`rounded-2xl p-4 flex items-center gap-4 shadow-inner ${status?.status === 'occupied'
          ? 'bg-red-100 border border-red-300 text-red-700'
          : 'bg-green-100 border border-green-300 text-green-700'
        }`}>
          {status?.status === 'occupied' ? (
            <>
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSADESsnqLTB7q95kJhJXXqRra6IqT3zbBhRA&s"
                alt="avatar"
                className="w-12 h-12 rounded-full border shadow"
                height={50}
                width={50}
              />
              <div>
                <p className="font-semibold text-lg">Occupied by</p>
                <p className="text-md">{status.occupiedBy}</p>
              </div>
            </>
          ) : (
            <p className="text-lg font-semibold w-full text-center">✅ Washroom is Free</p>
          )}
        </div>

        {/* Logged-in Info */}
        <div className="text-center text-sm text-gray-600 italic">
          Logged in as: <strong>{name || 'Guest'}</strong>
        </div>

        {/* Type Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Select Washroom Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-700 focus:ring-2 focus:ring-indigo-400"
          >
            <option value="Toilet">🚽 Toilet</option>
            <option value="Urinal">🚹 Urinal</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-4">
          <button
            onClick={occupy}
            disabled={loading}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl shadow-md font-semibold transition-all disabled:opacity-50"
          >
            {loading ? 'Processing...' : '🚻 Occupy'}
          </button>
          <button
            onClick={free}
            disabled={loading}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl shadow-md font-semibold transition-all disabled:opacity-50"
          >
            {loading ? 'Processing...' : '✅ Free'}
          </button>
        </div>
      </div>

      <ToastContainer position="bottom-center" autoClose={3000} />
    </div>
  );
}
