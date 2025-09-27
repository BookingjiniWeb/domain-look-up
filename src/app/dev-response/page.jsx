"use client"

import { useState, useEffect } from "react"
import { Linkedin, Mail, Phone, MessageCircle } from "lucide-react"

export default function SubmissionList() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedSkills, setSelectedSkills] = useState([])
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/dev-data")
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

    const openSkills = (skills = []) => {
        setSelectedSkills(skills)
        setShowModal(true)
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500 text-lg">Loading submissions...</p>
            </div>
        )
    }

    return (
        <div className="p-4 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
                Candidate Submissions
            </h1>

            <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
                <table className="w-full text-xs md:text-sm text-left text-gray-600">
                    <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 uppercase text-xs tracking-wide">
                        <tr>
                            <th className="px-3 py-2 md:px-6 md:py-3">Name</th>
                            <th className="px-3 py-2 md:px-6 md:py-3">Email</th>
                            <th className="px-3 py-2 md:px-6 md:py-3">Phone</th>
                            <th className="px-3 py-2 md:px-6 md:py-3">LinkedIn</th>
                            <th className="px-3 py-2 md:px-6 md:py-3">WhatsApp</th>
                            <th className="px-3 py-2 md:px-6 md:py-3">Skills</th>
                            <th className="px-3 py-2 md:px-6 md:py-3">Exp</th>
                            <th className="px-3 py-2 md:px-6 md:py-3">CTC</th>
                            <th className="px-3 py-2 md:px-6 md:py-3">Expected</th>
                            <th className="px-3 py-2 md:px-6 md:py-3">DOJ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(data) && data.length > 0 ? (
                            data.map((d, i) => (
                                <tr
                                    key={i}
                                    className="border-b hover:bg-gray-50 transition duration-200 text-xs md:text-sm"
                                >
                                    <td className="px-3 py-2 md:px-6 md:py-4 font-medium text-gray-800">{d.name}</td>

                                    <td className="px-3 py-2 md:px-6 md:py-4 ">

                                        <a
                                            href={`mailto:${d.email}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            {d.email}
                                        </a>                                    </td>

                                    <td className="px-3 py-2 md:px-6 md:py-4 ">

                                        <span>{d.phone}</span>
                                    </td>

                                    <td className="px-3 py-2 md:px-6 md:py-4">
                                        {d.linkedin && (
                                            <a
                                                href={d.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-blue-600 font-medium hover:underline"
                                            >
                                                <Linkedin className="w-3 h-3 md:w-4 md:h-4" /> LinkedIn
                                            </a>
                                        )}
                                    </td>

                                    <td className="px-3 py-2 md:px-6 md:py-4">
                                        {d.phone && (
                                            <a
                                                href={`https://wa.me/${d.phone.replace(/[^0-9]/g, "")}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-green-600 font-medium hover:underline"
                                            >
                                                <MessageCircle className="w-3 h-3 md:w-4 md:h-4" /> WhatsApp
                                            </a>
                                        )}
                                    </td>

                                    <td className="px-3 py-2 md:px-6 md:py-4">
                                        <button
                                            onClick={() => openSkills(d.skills)}
                                            className="px-2 py-1 text-xs md:text-sm font-medium bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition"
                                        >
                                            View
                                        </button>
                                    </td>

                                    <td className="px-3 py-2 md:px-6 md:py-4">
                                        <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">{d.exp}</span>
                                    </td>

                                    <td className="px-3 py-2 md:px-6 md:py-4">
                                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">{d.ctc}</span>
                                    </td>

                                    <td className="px-3 py-2 md:px-6 md:py-4">
                                        <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">{d.expected}</span>
                                    </td>

                                    <td className="px-3 py-2 md:px-6 md:py-4">
                                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">{d.doj}</span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10" className="px-3 py-4 text-center text-gray-500 italic">
                                    No submissions available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal for Skills */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm px-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-4 md:p-6 relative">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 text-center">
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
