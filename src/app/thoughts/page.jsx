'use client';

import { useState, useEffect } from "react";
import { X, LoaderIcon } from "lucide-react";

const CEOThoughts = () => {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/ceo-message");
                if (res.ok) {
                    const data = await res.json();
                    setMessages(data);
                }
            } catch (err) {
                console.error("Error fetching messages:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMessages();
    }, []);


    return (
       <section className="relative z-50 w-full min-h-screen py-16 bg-gradient-to-b from-orange-50 via-white to-pink-50 flex flex-col overflow-x-hidden">
    <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12 tracking-tight">
        Thoughts Shared by Everyone
    </h2>

    <div className="flex-1 w-full overflow-y-auto px-6 md:px-12 pb-12 relative">
        {loading ? (
            <div className="flex items-center justify-center h-64">
                <LoaderIcon className="h-8 w-8 animate-spin text-gray-500" />
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full">
                {messages.length === 0 && (
                    <p className="text-gray-500 text-center col-span-full">
                        No thoughts have been submitted yet.
                    </p>
                )}

                {messages.map((msg, index) => {
                    const gradients = [
                        "from-pink-50 via-white to-orange-50",
                        "from-green-50 via-white to-teal-50",
                        "from-blue-50 via-white to-purple-50",
                    ];
                    const gradient = gradients[index % gradients.length];

                    return (
                        <div
                            key={msg._id}
                            className={`p-6 rounded-3xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer relative overflow-hidden bg-gradient-to-br ${gradient}`}
                            onClick={() => setSelectedMessage(msg)}
                        >
                            <div className="flex items-center gap-4 mb-5">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                    {msg.name[0].toUpperCase()}
                                </div>
                                <p className="font-semibold text-gray-900 text-lg">{msg.name}</p>
                            </div>

                            <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                                {msg.message.split(" ").slice(0, 10).join(" ")}
                                {msg.message.split(" ").length > 10 ? "..." : ""}
                            </p>

                            <div className="flex justify-between items-center text-gray-500 text-sm mt-5">
                                <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                                <span className="font-semibold text-pink-600 hover:underline">Read More</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        )}
    </div>

    {selectedMessage && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl max-w-3xl w-full p-10 relative shadow-2xl max-h-[90vh] overflow-y-auto animate-fadeIn">
                <button
                    onClick={() => setSelectedMessage(null)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                        {selectedMessage.name[0].toUpperCase()}
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">{selectedMessage.name}</h3>
                </div>

                <div className="flex flex-col gap-2">
                    {selectedMessage.message.split("\n").map((line, index) => (
                        <div
                            key={index}
                            className="bg-pink-50/80 text-gray-800 p-3 rounded-2xl max-w-full break-words shadow-sm"
                            style={{ whiteSpace: "pre-wrap" }}
                        >
                            {line}
                        </div>
                    ))}
                </div>
                <p className="text-gray-400 text-xs">{new Date(selectedMessage.createdAt).toLocaleString()}</p>
            </div>
        </div>
    )}

    <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
    `}</style>
</section>

    );
};

export default CEOThoughts;
