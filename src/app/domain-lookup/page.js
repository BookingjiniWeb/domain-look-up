'use client';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Lookup = () => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [amName, setAmName] = useState('');
  const [propertyName, setPropertyName] = useState('');
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="p-4 sm:p-6 md:p-10 max-w-8xl mx-auto lg:pt-22  bg-gradient-to-tr from-indigo-100 via-white to-teal-100  " >
      <Toaster />
      <h1 className="text-4xl font-extrabold mb-6 text-indigo-600 text-center">🔍 Domain & SSL Lookup</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="🔎 Filter by Account Manager Name"
          value={amName}
          onChange={(e) => setAmName(e.target.value)}
          className="p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full text-black"
        />

        <input
          type="text"
          placeholder="🏨 Filter by Property Name"
          value={propertyName}
          onChange={(e) => setPropertyName(e.target.value)}
          className="p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full text-black"
        />

        <button
          onClick={fetchAllData}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded-lg shadow w-full transition duration-200"
        >
          🔄 Refresh Data
        </button>

        <button
          onClick={resetFilters}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-5 py-2 rounded-lg shadow w-full transition duration-200"
        >
          ♻️ Reset Filters
        </button>
      </div>


      {loading ? (
  <div className="flex justify-center items-center py-20 bg-white min-h-[700px]">
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
                      {idx + 1}
                    </td>
                    <td className="p-2 border border-gray-300 text-gray-800 font-medium">
                      {item.propertyName}
                    </td>
                    <td className="p-2 border border-gray-300 text-gray-700">
                      {item.accountManager}
                    </td>
                    <td className="p-2 border border-gray-300 text-blue-700">
                      <a
                        href={`https://${item.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline transition-colors"
                      >
                        {item.url}
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
    </div>
  );
};

export default Lookup;
