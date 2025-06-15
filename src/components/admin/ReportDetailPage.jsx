
import React from "react";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, AlertCircle, Flag, Calendar } from "lucide-react";

const MOCK_REPORT = {
  id: "RPT-004",
  type: "Payment Issue",
  reporter: "Mike Johnson",
  reporterEmail: "mike.j@example.com",
  reported: "ElectroWorld",
  reportedEmail: "support@electroworld.com",
  priority: "Critical",
  status: "Pending",
  description:
    "User reported an unauthorized payment activity. Customer claims to have been overcharged and did not receive the product.",
  date: "2024-01-12",
  actions: ["Investigate payment logs", "Contact the seller", "Issue refund if needed"],
};

const badgeColor = {
  "Pending": "bg-red-100 text-red-600",
  "Under Review": "bg-blue-100 text-blue-600",
  "Resolved": "bg-green-100 text-green-600",
  "Investigating": "bg-yellow-100 text-yellow-700",
};

const priorityBadge = (priority) => {
  switch (priority) {
    case "High":
      return <span className="bg-orange-100 text-orange-600 rounded-full px-3 py-1 text-xs font-semibold">{priority}</span>;
    case "Medium":
      return <span className="bg-yellow-100 text-yellow-700 rounded-full px-3 py-1 text-xs font-semibold">{priority}</span>;
    case "Critical":
      return <span className="bg-red-100 text-red-500 rounded-full px-3 py-1 text-xs font-semibold">{priority}</span>;
    default:
      return <span className="bg-gray-100 text-gray-500 rounded-full px-3 py-1 text-xs font-semibold">{priority}</span>;
  }
};

const statusBadge = (status) => (
  <span className={
      "inline-flex gap-2 items-center font-semibold rounded-full px-4 py-2 text-base shadow-sm " +
      (badgeColor[status] || "bg-gray-100 text-gray-600")
    }
  >
    {status === "Pending" && <AlertCircle className="w-5 h-5" />}
    {status === "Under Review" && <Flag className="w-5 h-5" />}
    {status === "Resolved" && <User className="w-5 h-5" />}
    {status === "Investigating" && <AlertCircle className="w-5 h-5" />}
    {status}
  </span>
);

const ReportDetailPage = ({ report = MOCK_REPORT, onBack }) => {
  return (
    <div className="w-full max-w-3xl mx-auto mt-6 animate-fade-in">
      <button onClick={onBack} className="flex items-center gap-2 bg-transparent text-gray-500 hover:text-black font-medium mb-4">
        <ArrowLeft size={20} />
        Back to Reports
      </button>

      <div className="bg-white rounded-2xl p-7 shadow-md border border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Report #{report.id}</h1>
            <span className="text-gray-500 text-base">Reported {report.date}</span>
          </div>
          <div className="flex gap-3 mt-3 sm:mt-0">
            {statusBadge(report.status)}
            {priorityBadge(report.priority)}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Left side: Info */}
          <div>
            <h2 className="font-semibold text-gray-700 mb-2">Report Info</h2>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-gray-500 font-medium">Type</div>
                <div className="font-medium text-gray-900">{report.type}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium">Description</div>
                <div className="text-base text-gray-800">{report.description}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium mb-0.5">Reported Party</div>
                <div className="flex items-center gap-2">
                  <User size={18} className="text-gray-400" />
                  <span className="font-medium">{report.reported}</span>
                  <span className="text-gray-400 text-xs ml-2">{report.reportedEmail}</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium mb-0.5">Reporter</div>
                <div className="flex items-center gap-2">
                  <User size={18} className="text-gray-400" />
                  <span className="font-medium">{report.reporter}</span>
                  <span className="text-gray-400 text-xs ml-2">{report.reporterEmail}</span>
                </div>
              </div>
            </div>
          </div>
          {/* Right side: Timeline / Actions */}
          <div>
            <h2 className="font-semibold text-gray-700 mb-2">Actions</h2>
            <ul className="mb-6 space-y-2">
              {report.actions.map((action, idx) => (
                <li key={idx} className="flex gap-2 items-start">
                  <span className="inline-block mt-0.5 w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-gray-800">{action}</span>
                </li>
              ))}
            </ul>
            <div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Calendar size={17} className="text-gray-400" />
                Created on <span className="text-gray-700 font-semibold">{report.date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailPage;

