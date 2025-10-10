"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Copy, Globe, Star, Layers } from "lucide-react";

export default function DemoTemplets() {
    const [templates, setTemplates] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        fetch("/api/demo-templets")
            .then((res) => res.json())
            .then((data) => setTemplates(data));
    }, []);

    const filteredTemplates =
        filter === "all"
            ? templates
            : templates.filter((item) => item.type === filter);

    const copyToClipboard = (url) => {
        navigator.clipboard.writeText(url);
        toast.success("Copied to clipboard!");
    };

    const copyAll = (type) => {
        const urls = templates
            .filter((item) => type === "all" || item.type === type)
            .map((item) => item.url)
            .join("\n");

        if (urls) {
            navigator.clipboard.writeText(urls);
            toast.success(`All ${type} URLs copied!`);
        }
    };

    const typeColor = (type) =>
        type === "basic"
            ? "bg-blue-200 text-blue-900"
            : "bg-yellow-200 text-yellow-900";

    return (
        <div className="p-6 max-w-6xl mx-auto md:mt-20">
            {/* <h1 className="text-2xl font-bold mb-6 text-gray-900">Demo Templates</h1> */}

            {/* Filter Buttons */}
            <div className="mb-5 flex flex-wrap justify-center gap-3">
                {[
                    { type: "all", icon: <Globe size={14} /> },
                    { type: "basic", icon: <Layers size={14} /> },
                    { type: "premium", icon: <Star size={14} /> },
                ].map(({ type, icon }) => (
                    <Button
                        key={type}
                        variant={filter === type ? "default" : "outline"}
                        className="px-3 py-1 text-xs font-medium flex items-center gap-1"
                        onClick={() => setFilter(type)}
                    >
                        {icon}
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Button>
                ))}

                <Button
                    onClick={() => copyAll(filter)}
                    className="px-3 py-1 text-xs flex items-center gap-1 rounded-md 
             bg-indigo-500 text-white font-medium 
             hover:bg-indigo-600 hover:shadow-md transition-all duration-300"
                >
                    <Copy size={14} /> Copy All {filter === "all" ? "" : filter.toUpperCase()}
                </Button>

            </div>

            {/* Table */}
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
                                URL
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
                                Type
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredTemplates.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-2 whitespace-nowrap text-xs font-medium text-gray-900">
                                    {item.id}
                                </td>
                                <td className="px-4 py-2 text-xs text-gray-900">
                                    <span className="truncate max-w-xs block"><a href="https://bookingjini.com">{item.url}</a></span>
                                </td>
                                <td className="px-4 py-2 text-xs">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-semibold ${typeColor(
                                            item.type
                                        )}`}
                                    >
                                        {item.type.toUpperCase()}
                                    </span>
                                </td>
                                <td className="px-4 py-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="text-xs px-2 py-1 flex items-center gap-1"
                                        onClick={() => copyToClipboard(item.url)}
                                    >
                                        <Copy size={12} /> Copy
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
