"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-toastify";
import { Copy, X, Globe, Star, Layers, Shield, Cpu, Server, Settings, Smartphone, Search, FileText, Mail, Layout, CalendarCheck } from "lucide-react";

export default function DemoTemplets() {
    const [templates, setTemplates] = useState([]);
    const [filter, setFilter] = useState("all");
    const [showPopup, setShowPopup] = useState(false);


    useEffect(() => {
        // Show popup on page load
        setShowPopup(true);
    }, []);
    const copyPlan = (planName, features) => {
        navigator.clipboard.writeText(`${planName} Plan Features:\n${features.join("\n")}`);
        toast.success(`${planName} plan details copied!`);
    };

    const basicFeatures = [
        "✅ Domain Registration",
        "✅ Reliable Web Hosting",
        "✅ SSL Certificate",
        "✅ 1 Year Backup",
        "✅ Modifications / Maintenance",
        "✅ Monthly Health Checkup",
        "✅ Mobile Responsive",
        "✅ SEO Friendly",
        "✅ Up to 5 Pages",
        "✅ Social Media Integration"
    ];

    const premiumFeatures = [
        ...basicFeatures,
        "✅ 5 Free Professional Email Accounts",
        "✅ Advanced On-Page SEO",
        "✅ Premium Design",
        "✅ Custom Integrations(Chatbot,whatsapp,etc.)",
        "✅ Blog / News Section",
        "✅ Priority Support"
    ];



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
            ? "bg-blue-100 text-blue-800"
            : "bg-indigo-100 text-indigo-800";

    return (
        <div className="p-6 max-w-7xl mx-auto md:mt-20">
            {/* Header */}
            <h1 className="text-3xl font-bold text-indigo-900 mb-6 text-center">
                Demo Templates
            </h1>

            {/* Filter Buttons */}
            <div className="mb-6 flex flex-wrap justify-center gap-3">
                {[
                    { type: "all", icon: <Globe size={16} /> },
                    { type: "basic", icon: <Layers size={16} /> },
                    { type: "premium", icon: <Star size={16} /> },
                ].map(({ type, icon }) => (
                    <Button
                        key={type}
                        variant={filter === type ? "default" : "outline"}
                        className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${filter === type
                            ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md"
                            : "border border-indigo-300 text-indigo-700 hover:bg-indigo-50"
                            } transition-all duration-300`}
                        onClick={() => setFilter(type)}
                    >
                        {icon} {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Button>
                ))}

                <Button
                    onClick={() => copyAll(filter)}
                    className="px-4 py-2 text-sm flex items-center gap-2 rounded-md 
             bg-indigo-500 text-white font-medium 
             hover:bg-indigo-600 hover:shadow-lg transition-all duration-300"
                >
                    <Copy size={16} /> Copy All {filter === "all" ? "" : filter.toUpperCase()}
                </Button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto shadow-lg rounded-xl">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gradient-to-r from-indigo-200 to-blue-100 text-indigo-900">
                        <tr>
                            <th className="px-5 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-5 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                                URL
                            </th>
                            <th className="px-5 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                                Type
                            </th>
                            <th className="px-5 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredTemplates.map((item) => (
                            <tr
                                key={item.id}
                                className="hover:bg-indigo-50 transition-colors duration-200"
                            >
                                <td className="px-5 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {item.id}
                                </td>
                                <td className="px-5 py-3 text-sm text-indigo-900">
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline hover:text-blue-600 truncate max-w-xs block"
                                    >
                                        {item.url}
                                    </a>
                                </td>
                                <td className="px-5 py-3 text-sm">
                                    <span
                                        className={`px-2 py-1 rounded text-sm font-semibold ${typeColor(
                                            item.type
                                        )}`}
                                    >
                                        {item.type.toUpperCase()}
                                    </span>
                                </td>
                                <td className="px-5 py-3 text-sm">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="text-sm px-3 py-1 flex items-center gap-1 border-indigo-400 hover:border-indigo-500 text-indigo-700 hover:bg-indigo-50 transition-all duration-300"
                                        onClick={() => copyToClipboard(item.url)}
                                    >
                                        <Copy size={14} /> Copy
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        {filteredTemplates.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-5 py-6 text-center text-gray-500">
                                    No templates found for this type.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>


            {showPopup && (

                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={() => setShowPopup(false)}
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setShowPopup(false)}
                        className="absolute top-3 right-85 text-gray-500 hover:text-red-500 bg-white hover:bg-gray-100 rounded-full p-2 shadow-md transition-all duration-300"
                    >
                        <X size={16} />
                    </button>

                    <div
                        className="relative w-11/12 max-w-3xl p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl shadow-2xl border-t-4 border-indigo-500"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-bold text-indigo-900 mb-2 flex justify-center items-center gap-2">
                                👋 Demo Templates
                            </h2>
                            <p className="text-gray-700 text-sm">
                                Choose the plan that fits your needs. Copy plan details easily!
                            </p>
                        </div>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Basic Plan */}
                            <Card className="shadow-md hover:shadow-lg transition-all border border-indigo-200 relative">
                                {/* Price Tag */}
                                <div className="absolute top-4 right-4 
    bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
    text-white px-4 py-2 rounded-full font-bold text-sm 
    shadow-xl animate-bounce hover:scale-110 transform transition-all duration-300">
                                    ₹15k + GST
                                </div>

                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-indigo-700 text-xl font-semibold">
                                        <Layers size={20} /> Basic Plan
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    {basicFeatures.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-2 text-gray-700 text-xs">
                                            {feature}
                                        </div>
                                    ))}
                                    <Button
                                        onClick={() => copyPlan("Basic", basicFeatures)}
                                        className="mt-3 w-full bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg"
                                    >
                                        Copy Plan Details
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Premium Plan */}
                            <Card className="shadow-lg hover:shadow-xl transition-all border border-indigo-300 bg-gradient-to-br from-indigo-100 to-blue-100 relative">
                                {/* Price Tag */}
                                <div className="absolute top-4 right-4 
    bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
    text-white px-4 py-2 rounded-full font-bold text-sm 
    shadow-xl animate-bounce hover:scale-110 transform transition-all duration-300">
                                    ₹25k + GST
                                </div>

                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-indigo-900 text-xl font-semibold">
                                        <Star size={20} /> Premium Plan
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    {premiumFeatures.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-2 text-gray-700 text-xs">
                                            {feature}
                                        </div>
                                    ))}
                                    <Button
                                        onClick={() => copyPlan("Premium", premiumFeatures)}
                                        className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg"
                                    >
                                        Copy Plan Details
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            )}
            {/* Sticky Vertical Button */}
            <button
                onClick={() => setShowPopup(true)}
                className="fixed left-3 top-1/3 transform -translate-y-1/2 
             bg-gradient-to-b from-indigo-500 via-purple-500 to-blue-500 
             text-white px-5 py-3  shadow-lg 
             hover:scale-105 hover:shadow-2xl transition-all duration-300 
             z-50 flex items-center justify-center rotate-[-90deg] origin-left 
             font-bold tracking-wide animate-pulse hover:animate-none 
             before:absolute before:inset-0 before:rounded-r-3xl before:bg-gradient-to-r before:from-indigo-400 before:to-blue-400 before:opacity-30 before:blur-xl">
                Show Plans
            </button>


        </div>
    );
}
