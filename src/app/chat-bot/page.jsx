"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Globe, ChevronLeft, ChevronRight, Eye, LoaderIcon } from "lucide-react";
import { toast } from "react-toastify";

export default function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [previewCompanyId, setPreviewCompanyId] = useState(null);
  const [loading, setLoading] = useState(false);



  const itemsPerPage = 10;

  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_INTRANET_URL_API, {
          headers: {
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN_INTRANET}`,
            "Content-Type": "application/json",
          },
        });
        const json = await res.json();
        const companyArray = json.companyDetails || json.data?.companyDetails || [];
        setCompanies(companyArray);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch companies");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const copyChatbotScript = (company_id) => {
    const script = `<script async src="https://jiniassist.bookingjini.com/embed.js?company_id=${company_id}"></script>`;
    navigator.clipboard.writeText(script);
    toast.success("Chatbot script copied!");
  };

  const copyHTML = (company_id) => {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>Chatbot Preview</title>
</head>
<body>
  <h1>Chatbot Preview for Company ID: ${company_id}</h1>
  <p>This is how the chatbot will appear.</p>
  <script async src="https://jiniassist.bookingjini.com/embed.js?company_id=${company_id}"></script>
</body>
</html>
`;
    navigator.clipboard.writeText(htmlContent);
    toast.success("HTML copied to clipboard!");
  };

  const filteredCompanies = companies.filter((c) =>
    c.company_full_name.toLowerCase().includes(search.toLowerCase().trim())
  );

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCompanies = filteredCompanies.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>


      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4 mt-12">
        <div className="max-w-6xl mx-auto">
          {/* Title + Search */}
          <div className="mb-4 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
            {/* Title */}
            <h1
              className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight"
              style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '1px' }}
            >
              Properties Chatbot
            </h1>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search property..."
              className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>


          {/* Table */}
          <div className="overflow-x-auto shadow-md rounded-xl bg-white">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold uppercase tracking-wider">SL</th>
                  <th className="px-4 py-3 text-left font-semibold uppercase tracking-wider">Property</th>
                  <th className="px-4 py-3 text-left font-semibold uppercase tracking-wider">Website</th>
                  <th className="px-4 py-3 text-left font-semibold uppercase tracking-wider">Preview & Copy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center">
                      <LoaderIcon className="h-8 w-8 animate-spin text-indigo-500 inline-block" />
                    </td>
                  </tr>
                ) : currentCompanies.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-2 text-center text-gray-500">
                      No properties found.
                    </td>
                  </tr>
                ) : (
                  currentCompanies.map((c, i) => (
                    <tr
                      key={c.company_id}
                      className={i % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "bg-white hover:bg-gray-100"}
                    >
                      <td className="px-4 py-2 text-gray-700 text-center">{startIndex + i + 1}</td>
                      <td className="px-4 py-2 text-gray-800 font-medium">{c.company_full_name.trim()}</td>
                      <td className="px-4 py-2">
                        {c.home_url ? (
                          <a
                            href={c.home_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 font-medium transition flex items-center gap-1"
                          >
                            <Globe size={16} /> Visit website
                          </a>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="px-4 py-2 text-center flex gap-2 justify-center">
                        <Button
                          size="sm"
                          className="flex items-center gap-1 px-3 py-1 text-xs bg-green-500 text-white hover:bg-green-600 border-none transition"
                          onClick={() => setPreviewCompanyId(c.company_id)}
                        >
                          <Eye size={14} /> Preview
                        </Button>
                        <Button
                          size="sm"
                          className="flex items-center gap-1 px-3 py-1 text-xs bg-indigo-500 text-white hover:bg-indigo-600 border-none transition"
                          onClick={() => copyChatbotScript(c.company_id)}
                        >
                          <Copy size={14} /> Copy
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-5">
              <Button
                size="sm"
                variant="outline"
                disabled={currentPage === 1}
                className="flex items-center gap-1 text-gray-700 border-gray-300 hover:bg-gray-100 transition"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              >
                <ChevronLeft size={14} /> Prev
              </Button>
              <span className="text-sm text-gray-800">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                size="sm"
                variant="outline"
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 text-gray-700 border-gray-300 hover:bg-gray-100 transition"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              >
                Next <ChevronRight size={14} />
              </Button>
            </div>
          )}
        </div>

        {/* Popup */}
        {previewCompanyId && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 max-h-[80vh] overflow-auto p-6 relative">
              <h2 className="text-lg font-semibold mb-4">Chatbot Preview</h2>

              <iframe
                title="Chatbot Preview"
                className="w-full h-[60vh] border rounded-lg"
                srcDoc={`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Chatbot Preview</title>
          </head>
          <body>
            <h3>Chatbot Preview for Company ID: ${previewCompanyId}</h3>
            <script async src="https://jiniassist.bookingjini.com/embed.js?company_id=${previewCompanyId}"></script>
          </body>
          </html>
        `}
              />

              <div className="flex justify-end mt-4 gap-2">
                <Button
                  size="sm"
                  className="bg-red-500 text-white hover:bg-red-600"
                  onClick={() => setPreviewCompanyId(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
