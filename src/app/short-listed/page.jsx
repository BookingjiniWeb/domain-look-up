"use client"

import { useState, useEffect } from "react"
import { Linkedin, Mail, MessageCircle } from "lucide-react"

export default function SubmissionList() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedSkills, setSelectedSkills] = useState([])
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/test-api")
                if (!res.ok) throw new Error("Failed to fetch")
                const json = await res.json()
                setData(json)
            } catch (err) {
                console.error("Error fetching submissions:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    // ✅ Show only "approved by developer"
    const filteredData = data.filter(d => d.status === "approved by developer")

    const openSkills = (skills = []) => {
        setSelectedSkills(skills)
        setShowModal(true)
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500 text-lg animate-pulse">Loading approved submissions...</p>
            </div>
        )
    }

    return (
        <div className="p-4 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
            <div className="text-center mt-16 mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    Shortlisted Candidates
                </h1>
                <p className="text-gray-600 text-sm mt-2">
                    Total Approved: {filteredData.length}
                </p>
            </div>

            <div className="overflow-x-auto shadow-xl rounded-2xl border border-gray-200">
                <table className="w-full text-sm text-left text-gray-600">
                    <thead className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-900 uppercase text-xs tracking-wide">
                        <tr>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Phone</th>
                            <th className="px-4 py-3">LinkedIn</th>
                            <th className="px-4 py-3">Portfolio</th>
                            <th className="px-4 py-3">WhatsApp</th>
                            <th className="px-4 py-3">Skills</th>
                            <th className="px-4 py-3">Exp</th>
                            <th className="px-4 py-3">CTC</th>
                            <th className="px-4 py-3">Expected</th>
                            <th className="px-4 py-3">DOJ</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredData.length > 0 ? (
                            filteredData.map((d, i) => (
                                <tr
                                    key={i}
                                    className="hover:bg-blue-50 transition duration-200"
                                >
                                    <td className="px-4 py-3 font-medium text-gray-800">{d.name}</td>
                                    <td className="px-4 py-3">
                                        {d.email && (
                                            <a
                                                href={`mailto:${d.email}`}
                                                className="text-blue-600 hover:underline flex items-center gap-1"
                                            >
                                               {d.email}
                                            </a>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">{d.phone}</td>
                                    <td className="px-4 py-3">
                                        {d.linkedin && (
                                            <a
                                                href={d.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline flex items-center gap-1"
                                            >
                                                <Linkedin className="w-4 h-4" />
                                            </a>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        {d.portfolio && (
                                            <a
                                                href={d.portfolio}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                Portfolio
                                            </a>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        {d.phone && (
                                            <a
                                                href={`https://wa.me/${d.phone.replace(/[^0-9]/g, "")}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-green-600 hover:underline flex items-center gap-1"
                                            >
                                                <MessageCircle className="w-4 h-4" /> Chat
                                            </a>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => openSkills(d.skills)}
                                            className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition"
                                        >
                                            View
                                        </button>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">{d.exp}</span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">{d.ctc}</span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">{d.expected}</span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">{d.doj}</span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" className="px-4 py-6 text-center text-gray-500 italic">
                                    No approved candidates available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Skills Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm px-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                            Candidate Skills
                        </h2>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {selectedSkills.length > 0 ? (
                                selectedSkills.map((skill, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 bg-blue-100 text-blue-700 text-xs md:text-sm rounded-full shadow-sm"
                                    >
                                        {skill}
                                    </span>
                                ))
                            ) : (
                                <p className="text-gray-500 italic">No skills available</p>
                            )}
                        </div>
                        <button
                            onClick={() => setShowModal(false)}
                            className="mt-6 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
