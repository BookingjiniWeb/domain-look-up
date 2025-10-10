"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Globe, ShieldCheck, LayoutDashboard, MessageSquare, Rocket } from "lucide-react";
import { useRouter } from "next/navigation";

export default function QuickAccessPage() {
    const router = useRouter();

    const cards = [
        {
            id: "demo",
            title: "Demo Templates",
            description: "Explore pre-built UI layouts and designs for faster development.",
            icon: <LayoutDashboard size={28} className="text-white" />,
            accent: "bg-blue-600",
            hover: "hover:shadow-blue-200",
            link: "/demo-templets",
        },
        {
            id: "domains",
            title: "Ssl  & Domains",
            description: "Manage and connect your business domains seamlessly.",
            icon: <Globe size={28} className="text-white" />,
            accent: "bg-emerald-600",
            hover: "hover:shadow-emerald-200",
            link: "/domain-lookup",
        },
        {
            id: "chatbot",
            title: "Chatbot Script",
            description: "Integrate and manage your property chatbots easily.",
            icon: <MessageSquare size={28} className="text-white" />,
            accent: "bg-purple-600",
            hover: "hover:shadow-purple-200",
            link: "/chat-bot",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-32 px-6">
            <div className="max-w-6xl mx-auto text-center">
                <div className="text-center mb-12 px-4">
                    {/* Heading with icon */}
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <Rocket size={28} className="text-indigo-500" />
                        <h1
                            className="text-4xl sm:text-5xl font-extrabold text-gray-900"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            Quick Access
                        </h1>
                    </div>

                    {/* Subheading / tagline */}
                    <p
                        className="text-md sm:text-lg text-gray-600 font-medium"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                        Everything you need, all in one place. Access templates, domains, SSL & chatbots with ease.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cards.map((card) => (
                        <Card
                            key={card.id}
                            onClick={() => router.push(card.link)}
                            className={`cursor-pointer border border-gray-200 rounded-xl py-0 bg-white shadow-md transition-all duration-300 transform hover:scale-105 ${card.hover}`}
                        >
                            {/* Accent strip */}
                            <div className={`h-2 rounded-t-xl ${card.accent}`}></div>

                            {/* Icon circle */}
                            <div className={`flex items-center justify-center h-14 w-14 rounded-full ${card.accent} mx-auto shadow-lg`}>
                                {card.icon}
                            </div>

                            <CardContent className="p-5 pt-4 flex flex-col items-center text-center">
                                <h2 className="text-base font-semibold text-gray-800 mb-1">{card.title}</h2>
                                <p className="text-sm text-gray-500">{card.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
