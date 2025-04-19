'use client'
import { useState } from "react"
import React from 'react'


const Lookup = () => {
const [propertyName, setPropertyName] = useState('');
const [propertyId, setPropertyId] = useState('');
const [accountManager, setAccountManager] = useState('');
const [email, setEmail] = useState('');
const [url, setUrl] = useState('');


const sendData = async (e) => {
    e.preventDefault();
    const data = {
        propertyName,
        propertyId,
        accountManager,
        email,
        url
    }
    const res = await fetch('/api/storedata', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await res.json()
    console.log(result)
    alert('Data sent successfully')
}







    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-tr from-indigo-100 via-white to-teal-100">
            <form className="w-full max-w-2xl bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-xl border border-gray-200" onSubmit={sendData}>
                <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">🔍 Domain Lookup</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Property Name */}
                    <div className="flex flex-col">
                        <label htmlFor="propertyName" className="text-sm font-medium text-gray-700 mb-1">🏠 Property Name</label>
                        <input
                            type="text"
                            id="propertyName"
                            placeholder="Property name"
                            className="px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm text-black"
                            value={propertyName}
                            onChange={(e) => setPropertyName(e.target.value)}
                        />
                    </div>

                    {/* Property ID */}
                    <div className="flex flex-col">
                        <label htmlFor="propertyId" className="text-sm font-medium text-gray-700 mb-1">🆔 Property ID</label>
                        <input
                            type="text"
                            id="propertyId"
                            placeholder="e.g. PROP123"
                            className="px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm text-black"
                            value={propertyId}
                            onChange={(e) => setPropertyId(e.target.value)}
                        />
                    </div>

                    {/* Account Manager */}
                    <div className="flex flex-col">
                        <label htmlFor="accountManager" className="text-sm font-medium text-gray-700 mb-1">👤 Account Manager</label>
                        <input
                            type="text"
                            id="accountManager"
                            placeholder="Manager name"
                            className="px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm text-black"
                            value={accountManager}
                            onChange={(e) => setAccountManager(e.target.value)}
                        />
                    </div>

                    {/* Email ID */}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">📧 Email ID</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Manager email"
                            className="px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm text-black"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Domain URL */}
                    <div className="flex flex-col">
                        <label htmlFor="domainUrl" className="text-sm font-medium text-gray-700 mb-1">🌐 Domain URL</label>
                        <input
                            type="text"
                            id="domainUrl"
                            placeholder="example.com"
                            className="px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm text-black"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>

                </div>

                {/* Buttons */}
                <div className="mt-6 flex gap-4 justify-center">
                    <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 shadow-sm"
                    >
                        🚀 Submit
                    </button>
                    <button
                        type="reset"
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-md text-sm font-medium transition-all duration-200"
                    >
                        🔄 Reset
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Lookup
