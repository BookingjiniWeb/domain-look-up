"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import {
    ChevronLeft,
    ChevronRight,
    Search,
    Globe,
    CalendarCheck,
    DollarSign,
    ShieldCheck,

    Link as LinkIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function DomainTable() {
    const [domains, setDomains] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        fetch("/api/domain-hosting")
            .then((res) => res.json())
            .then((data) => setDomains(data.domains || []))
            .catch(() => toast.error("Failed to load domains"));
    }, []);

    // Filter domains by search
    const filteredDomains = domains.filter((domain) =>
        domain.name.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredDomains.length / pageSize);
    const currentDomains = filteredDomains.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const formatPrice = (priceObj) => {
        if (!priceObj?.listPrice) return "-";
        // Convert listPrice to lakhs/millions to show 899 from 899000000
        return `₹${(priceObj.listPrice / 1000000).toLocaleString()} + GST`;
    };


    const getStatusBadge = (domain) => {
        if (!domain.expirationDate) return null;

        const today = new Date();
        const expDate = new Date(domain.expirationDate);
        const diffTime = expDate - today; // difference in milliseconds
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // convert to days

        if (diffDays < 0) {
            // Expired
            return <Badge className="bg-red-400 text-white px-2 py-1 rounded-full">Expired</Badge>;
        } else if (diffDays <= 30) {
            // Near expiration
            return <Badge className="bg-yellow-400 text-black px-2 py-1 rounded-full">Expiring Soon</Badge>;
        } else {
            // Safe
            return <Badge className="bg-green-500 text-white px-2 py-1 rounded-full">Active</Badge>;
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto mt-14">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-extrabold text-indigo-900">
                    Domain with Us !
                </h1>

                {/* Search */}
                <div className="relative w-full md:w-64">
                    <Input
                        placeholder="Search domain..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1); // Reset to first page on search
                        }}
                        className="pr-10 text-sm md:text-base"
                    />
                    <Search
                        size={18}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                </div>
            </div>


            {/* Table */}
            <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-300 bg-white text-sm">
                    <thead className="bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-900">
                        <tr>
                            <th className="px-4 py-2 text-left font-semibold uppercase">Sl No</th>
                            <th className="px-4 py-2 text-left font-semibold uppercase">Domain</th>
                            <th className="px-4 py-2 text-left font-semibold uppercase">Expiration</th>
                            <th className="px-4 py-2 text-left font-semibold uppercase">Renewal</th>
                            <th className="px-4 py-2 text-left font-semibold uppercase">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {currentDomains.length > 0 ? (
                            currentDomains.map((domain, index) => (
                                <tr key={domain.id} className="hover:bg-indigo-50 transition-colors text-sm">
                                    <td className="px-4 py-2 text-gray-700">{(currentPage - 1) * pageSize + index + 1}</td>

                                    <td className="px-4 py-2 text-indigo-900 font-medium">
                                        <span className="inline-flex items-center gap-1">
                                            <Globe size={14} className="text-indigo-500" />
                                            <a
                                                href={`https://${domain.name}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:underline"
                                            >
                                                {domain.name}
                                            </a>
                                            <LinkIcon size={12} className="text-indigo-500" />
                                        </span>
                                    </td>

                                    <td className="px-4 py-2">
                                        <Badge
                                            variant="secondary"
                                            className="bg-blue-100 text-blue-800 px-3 py-1 flex items-center gap-1 rounded-full"
                                        >
                                            <CalendarCheck size={14} className="text-blue-500" /> {formatDate(domain.expirationDate)}
                                        </Badge>
                                    </td>

                                    {/* Renewal Price badge */}
                                    <td className="px-4 py-2">
                                        <Badge
                                            variant="secondary"
                                            className="bg-green-100 text-green-800 px-3 py-1 flex items-center gap-1 rounded-full"
                                        >
                                            <DollarSign size={14} className="text-green-500" /> {formatPrice(domain.renewalPrice)}
                                        </Badge>
                                    </td>

                                    <td className="px-4 py-2">{getStatusBadge(domain)}</td>
                                </tr>

                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                                    No domains found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4 gap-2">
                <Button
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft size={16} /> Prev
                </Button>
                <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 font-medium">
                    {currentPage} / {totalPages || 1}
                </span>
                <Button
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages || totalPages === 0}
                >
                    Next <ChevronRight size={16} />
                </Button>
            </div>
        </div>
    );
}
