'use client';
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Heart, Linkedin, Globe, MessageCircle } from "lucide-react"; // icons
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Page = () => {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const maxChars = 2000;
    const router = useRouter();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        // Prepare data
        const data = { name, message };

        try {
            const res = await fetch("/api/ceo-message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                toast.success("Message sent successfully!");
                setName("");
                setMessage("");
                setLoading(false);
                router.push("/thoughts");
            } else {
                toast.error("An error occurred while sending the message.");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            alert("An error occurred while sending the message.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <>

            <div className="min-h-screen w-screen flex flex-col md:flex-row 
                bg-gradient-to-br from-orange-100 via-white to-pink-100 
                overflow-y-auto md:overflow-hidden 
                relative z-[9999]">
                {/* LEFT SIDE (CEO Image + Intro) */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="md:w-1/2 w-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-pink-200/60 to-orange-100/40 relative rounded-3xl shadow-2xl overflow-hidden"
                >
                    {/* Floating circle background */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1.2 }}
                        transition={{ repeat: Infinity, duration: 12, yoyo: true }}
                        className="absolute w-80 h-80 bg-pink-300/40 blur-3xl rounded-full top-8 left-8"
                    />
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1.2 }}
                        transition={{ repeat: Infinity, duration: 15, yoyo: true, delay: 1 }}
                        className="absolute w-60 h-60 bg-orange-200/40 blur-2xl rounded-full bottom-10 right-10"
                    />

                    {/* CEO Image */}
                    <motion.img
                        src="ceo-img.jpg"
                        alt="CEO"
                        className="w-56 h-56 rounded-full border-4 border-white shadow-xl object-cover z-20"
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        transition={{ duration: 0.5 }}
                    />

                    {/* Heading */}
                    <motion.h2
                        className="text-3xl font-extrabold text-gray-800 mt-6 z-20 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        Our CEO Awaits Your Thoughts
                    </motion.h2>

                    {/* Subtext */}
                    <motion.p
                        className="text-gray-600 mt-2 text-center max-w-md z-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                    >
                        Every idea, feedback, and thought matters. Share your voice directly with leadership 💡
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        className="flex gap-4 mt-6 z-20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                    >
                        {/* LinkedIn Button */}
                        <a
                            href="https://www.linkedin.com/in/sibasishmisra"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-lg transition transform hover:scale-105"
                        >
                            <Linkedin className="w-5 h-5" /> LinkedIn
                        </a>

                        {/* Website Button */}
                        <a
                            href="https://bookingjini.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 shadow-lg transition transform hover:scale-105"
                        >
                            <Globe className="w-5 h-5" /> Website
                        </a>

                        {/* Other Thoughts Button */}
                        <button
                            onClick={() => router.push('/thoughts')}
                            className="flex items-center gap-2 px-5 py-2 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 shadow-lg transition transform hover:scale-105"
                        >
                            <MessageCircle className="w-5 h-5" /> Other Thoughts
                        </button>
                    </motion.div>
                </motion.div>

                {/* RIGHT SIDE (Form) */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className="md:w-1/2 w-full flex items-center justify-center p-6 md:p-12 relative"
                >
                    {/* Animated background blobs */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ repeat: Infinity, duration: 6 }}
                        className="absolute top-12 right-16 w-40 h-40 bg-orange-300/30 rounded-full blur-2xl"
                    />
                    <motion.div
                        animate={{ y: [0, 20, 0] }}
                        transition={{ repeat: Infinity, duration: 8 }}
                        className="absolute bottom-12 left-12 w-48 h-48 bg-pink-300/30 rounded-full blur-3xl"
                    />

                    {/* Two-layer glassmorphism cards */}
                    <motion.div
                        className="relative w-full max-w-lg"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Back layer */}
                        <motion.div
                            className="absolute top-2 left-2 w-full h-full rounded-3xl bg-pink-200/40 backdrop-blur-xl shadow-lg"
                            initial={{ opacity: 0.3, scale: 0.95 }}
                            animate={{ opacity: 0.3, scale: 0.95 }}
                        />

                        {/* Front layer */}
                        <motion.div
                            className="relative bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 z-20"
                            whileHover={{ rotate: [0, 1, -1, 0] }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="text-center mb-6">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-md"
                                >
                                    <Mail className="w-5 h-5" /> Share your honest thoughts
                                </motion.div>
                                <h2 className="text-2xl font-bold text-gray-800 mt-4">
                                    Write a letter to our CEO
                                </h2>
                                <p className="text-sm text-gray-600 mt-2">
                                    No thought is too small. We read every word, and{" "}
                                    <span className="font-semibold text-red-500 inline-flex items-center gap-1">
                                        we care <Heart className="w-4 h-4" />
                                    </span>
                                </p>
                            </div>

                            <motion.form
                                onSubmit={handleSubmit}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8 }}
                                className="w-full"
                            >
                                {/* Name Field */}
                                <motion.div className="mb-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                                    <label className="block text-gray-700 font-semibold mb-2">Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Your Name"
                                        required
                                        className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-pink-300 bg-white/60 shadow-sm text-gray-700 text-base"
                                    />
                                </motion.div>

                                {/* Message Field */}
                                <motion.div className="mb-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                                    <label className="block text-gray-700 font-semibold mb-2">Message</label>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Share your thoughts..."
                                        maxLength={maxChars}
                                        required
                                        className="w-full h-44 resize-none rounded-xl border border-gray-300 p-4 text-gray-700 text-base focus:ring-4 focus:ring-pink-300 focus:outline-none shadow-sm bg-white/60"
                                    />
                                    <div className="text-right text-sm text-gray-500 mt-1">
                                        {message.length}/{maxChars}
                                    </div>
                                </motion.div>

                                {/* Submit Button */}
                                <motion.div className="mt-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                                    <button
                                        type="submit"
                                        disabled={!name.trim() || !message.trim() || loading}
                                        className={`w-full py-3 rounded-xl font-semibold transition transform hover:scale-105 ${!name.trim() || !message.trim() || loading
                                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                            : "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md hover:shadow-lg"
                                            } flex items-center justify-center`}
                                    >
                                        {loading ? (
                                            <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            "Share Your Thoughts"
                                        )}
                                    </button>

                                </motion.div>
                            </motion.form>
                        </motion.div>
                    </motion.div>
                </motion.div>

            </div>

        </>
    );
};

export default Page;
