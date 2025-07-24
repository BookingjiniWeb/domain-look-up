'use client';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import Link from 'next/link';
import { RefreshCcw, Undo2, BarChart2, Search, Hotel, Building } from "lucide-react"; // Import icons


const Lookup = () => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [amName, setAmName] = useState('');
  const [propertyName, setPropertyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editedData, setEditedData] = useState({});


  const fetchAllData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/allinone');
      const result = await res.json();
      setAllData(result.data || []);
      setFilteredData(result.data || []);
      toast.success('Data loaded successfully!');
    } catch (err) {
      console.error('Failed to fetch data:', err);
      toast.error('Failed to load data!');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchAllData();
  }, []);

  // Filter handler
  useEffect(() => {
    const filtered = allData.filter(item => {
      const amMatch =
        amName.trim() === '' || item.accountManager?.toLowerCase().includes(amName.toLowerCase());
      const propertyMatch =
        propertyName.trim() === '' || item.propertyName?.toLowerCase().includes(propertyName.toLowerCase());
      return amMatch && propertyMatch;
    });

    setFilteredData(filtered);
  }, [amName, propertyName, allData]);

  const formatDate = dateStr => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const resetFilters = () => {
    setAmName('');
    setPropertyName('');
    toast.success('Filters reset!');
  };



  // section for Update the data
  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token) {
      toast.success('✅ Logged in successfully!');
      setIsAdmin(true);
    }
  }, []);
  const openEditModal = (item) => {
    setEditedData(item);
    setShowModal(true);
  };
  const handleUpdate = async () => {
    try {
      const res = await axios.put(`/api/modify/${editedData._id}`, editedData);
      if (res.status === 200) {
        toast.success("✅ Updated successfully!");
        setShowModal(false);      // closes modal
        fetchAllData();           // refresh table

      } else {
        toast.error("❌ Update failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to update.");
    }
  };
  // section for Update the data


  return (
    <>

      <div className="p-4 sm:p-6 md:p-10 max-w-8xl mx-auto lg:pt-22  bg-gradient-to-tr from-indigo-100 via-white to-teal-100 min-h-screen overflow-hidden" >
        <Toaster />
        {/* <h1 className="text-4xl font-extrabold mb-6 text-indigo-600 text-center">🔍 Domain & SSL Lookup <span>{filteredData.length}</span></h1> */}

        <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Filter by Account Manager"
              value={amName}
              onChange={(e) => setAmName(e.target.value)}
              className="pl-10 p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full text-black"
            />
          </div>

          <div className="relative">
            <Hotel className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Filter by Property Name"
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
              className="pl-10 p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full text-black"
            />
          </div>

          <button
            onClick={fetchAllData}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded-lg shadow w-full transition duration-200 flex items-center justify-center gap-2"
          >
            <RefreshCcw className="w-5 h-5" />
            Refresh
          </button>

          <button
            onClick={resetFilters}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-5 py-2 rounded-lg shadow w-full transition duration-200 flex items-center justify-center gap-2"
          >
            <Undo2 className="w-5 h-5" />
            Reset
          </button>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg shadow w-full transition duration-200 flex items-center justify-center gap-2"
          >
            <BarChart2 className="w-5 h-5" />
            Total Data: {filteredData.length}
          </button>
        </div>


        {loading ? (
          <div className="flex justify-center items-center py-20 bg-white min-h-[450px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600"></div>
          </div>
        ) : (
          <div className="overflow-auto">
            <table className="w-full border border-gray-200 rounded-xl overflow-hidden shadow-md">
              <thead className="bg-indigo-700 text-white text-sm uppercase tracking-wide">
                <tr>
                  <th className="p-4 border border-indigo-600 text-center">
                    🧾 <span className="ml-1">Sl No.</span>
                  </th>
                  <th className="p-4 border border-indigo-600 text-left">
                    🏨 <span className="ml-1">Property</span>
                  </th>
                  <th className="p-4 border border-indigo-600 text-left">
                    👤 <span className="ml-1">Account Manager</span>
                  </th>
                  <th className="p-4 border border-indigo-600 text-left">
                    🌐 <span className="ml-1">Domain</span>
                  </th>
                  <th className="p-4 border border-indigo-600 text-left">
                    🔒 <span className="ml-1">SSL Info</span>
                  </th>
                  <th className="p-4 border border-indigo-600 text-center">
                    📑 <span className="ml-1">Domain Info</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, idx) => (
                    <tr
                      key={idx}
                      className="even:bg-indigo-100 odd:bg-white hover:bg-indigo-50 hover:scale-[1.01] transition-all duration-200"
                    >

                      <td className="p-1 border border-gray-300 text-center font-medium text-gray-700">
                        {isAdmin ? (
                          <button
                            onClick={() => openEditModal(item)}
                            className="ml-2 text-blue-500 hover:text-blue-700"
                            title="Edit"
                          >
                            🖊️
                          </button>
                        ) : (
                          <div className="flex items-center justify-evenly">
                            {idx + 1}

                            <Link
                              href={`https://erp.bookingjini.com/app/issue?hotel_id=${item.propertyId}`}
                              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-[#b6985a] rounded-md hover:bg-[#a4854a] transition-colors duration-200" title="Go to ERP"
                              target="_blank"
                            >

                              <BarChart2 className="w-3 h-3 text-white" />ERP
                            </Link>
                          </div>
                        )}
                        {/* {idx + 1} */}

                      </td>
                      <td className="p-2 border border-gray-300 text-gray-800 font-medium flex flex-row justify-between ">

                        <div className="mt-1 text-gray-800 mr-1">{item.propertyName}</div>
                        <Link
                          href={`https://intranet.bookingjini.com/hotel-data/${item.propertyId}`}
                          title="Internal Network"
                          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-[#b6985a] rounded-md hover:bg-[#a4854a] transition-colors duration-200"
                        >
                          <Building className="w-4 h-4" />
                          <span>Intranet</span>
                        </Link>

                      </td>

                      <td className="p-2 border border-gray-300 text-gray-700">
                        {item.accountManager}
                      </td>
                      <td className="p-2 border border-gray-300 text-blue-700">
                        <a
                          href={item.url.startsWith('http://') || item.url.startsWith('https://') ? item.url : `https://${item.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline transition-colors"
                        >
                          {item.url.replace(/^https?:\/\//, '')}
                        </a>
                      </td>


                      <td className="p-2 border border-gray-300">
                        {item.daysRemaining < 0 ? (
                          <span className="text-red-600 font-semibold">❌ Expired</span>
                        ) : (
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3">
                            <span className="text-gray-800">📅 {formatDate(item.sslExpiry)}</span>
                            <span
                              className={`text-sm ${item.daysRemaining <= 5
                                ? 'text-red-600 font-semibold'
                                : 'text-green-700'
                                }`}
                            >
                              ⏳ {item.daysRemaining} Days Left
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="p-2 border border-gray-300 text-center">
                        <a
                          href={`https://www.whois.com/whois/${item.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-medium px-4 py-2 rounded-md transition-all duration-200 shadow-sm"
                        >
                          🌐 Whois
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center p-6 text-gray-500 font-medium">
                      No matching data found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

          </div>
        )}



        {showModal && editedData && (
          <div className="fixed inset-0  bg-opacity-10 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="bg-white p-8 rounded-lg w-full max-w-lg shadow-xl transform transition-all duration-300 ease-in-out">
              <h2 className="text-2xl font-semibold mb-6 text-indigo-600">Edit Property</h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdate();
                }}
                className="space-y-6"
              >
                {/* Property Name Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Name</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 text-black"
                    value={editedData.propertyName || ''}
                    onChange={(e) =>
                      setEditedData({ ...editedData, propertyName: e.target.value })
                    }
                  />
                </div>

                {/* Email Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 text-black"
                    value={editedData.email || ''}
                    onChange={(e) =>
                      setEditedData({ ...editedData, email: e.target.value })
                    }
                  />
                </div>

                {/* Account Manager Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Manager</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 text-black"
                    value={editedData.accountManager || ''}
                    onChange={(e) =>
                      setEditedData({ ...editedData, accountManager: e.target.value })
                    }
                  />
                </div>

                {/* URL Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 text-black"
                    value={editedData.url || ''}
                    onChange={(e) =>
                      setEditedData({ ...editedData, url: e.target.value })
                    }
                  />
                </div>

                {/* Button Section */}
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-black font-medium py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>

        )}



      </div>

      <footer className="fixed bottom-0 w-full bg-gradient-to-r from-white via-white to-white border-t border-white shadow-md py-4 px-6 flex flex-col items-center text-sm text-gray-700 z-50 backdrop-blur-md">
        <div className="flex flex-col items-center space-y-2">
          <a
            href="https://www.linkedin.com/in/shitansu-kumar-gochhayat-91b7a5241"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 
        0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 20h-3v-11h3v11zm-1.5-12.268c-.966 
        0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764c.965 0 1.75.79 
        1.75 1.764s-.785 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.026-3.064-1.868-3.064-1.87 
        0-2.156 1.46-2.156 2.968v5.7h-3v-11h2.879v1.501h.041c.401-.762 
        1.379-1.566 2.838-1.566 3.034 0 3.593 1.996 3.593 4.59v6.475z" />
            </svg>
            <span>
              Designed by{" "}
              <span className="font-semibold text-gray-800 hover:text-indigo-700 transition">
                - Shitansu
              </span>
            </span>
          </a>


        </div>
      </footer>

    </>
  );


};

export default Lookup;
