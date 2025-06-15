
import React, { useState } from "react";
import { AlarmWarning, Clock, MessageSquare, Ban, Eye, Filter } from "lucide-react";

const DEMO_REPORT_STATS = [
  {
    label: "Total Reports",
    icon: <AlarmWarning className="w-6 h-6 text-red-500 bg-red-100 rounded p-1.5" />,
    value: 156,
    className: "bg-red-50",
  },
  {
    label: "Pending",
    icon: <Clock className="w-6 h-6 text-yellow-500 bg-yellow-100 rounded p-1.5" />,
    value: 23,
    className: "bg-yellow-50",
  },
  {
    label: "Under Review",
    icon: <MessageSquare className="w-6 h-6 text-blue-500 bg-blue-100 rounded p-1.5" />,
    value: 45,
    className: "bg-blue-50",
  },
  {
    label: "Resolved",
    icon: <Ban className="w-6 h-6 text-green-500 bg-green-100 rounded p-1.5" />,
    value: 88,
    className: "bg-green-50",
  }
];

const DEMO_REPORTS = [
  {
    id: "RPT-001",
    type: "Product Violation",
    reporter: "John Smith",
    reported: "TechStore Inc.",
    priority: "High",
    status: "Under Review",
    date: "2024-01-15"
  },
  {
    id: "RPT-002",
    type: "Seller Misconduct",
    reporter: "Sarah Wilson",
    reported: "Fashion Hub",
    priority: "Medium",
    status: "Resolved",
    date: "2024-01-14"
  },
  {
    id: "RPT-003",
    type: "Review Manipulation",
    reporter: "Admin System",
    reported: "HomeDecor Plus",
    priority: "High",
    status: "Investigating",
    date: "2024-01-13"
  },
  {
    id: "RPT-004",
    type: "Payment Issue",
    reporter: "Mike Johnson",
    reported: "ElectroWorld",
    priority: "Critical",
    status: "Pending",
    date: "2024-01-12"
  },
];

const priorityBadge = (priority) => {
  switch (priority) {
    case "High":
      return <span className="bg-orange-100 text-orange-600 rounded-full px-2 py-0.5 text-xs font-semibold">High</span>;
    case "Medium":
      return <span className="bg-yellow-100 text-yellow-600 rounded-full px-2 py-0.5 text-xs font-semibold">Medium</span>;
    case "Critical":
      return <span className="bg-red-100 text-red-500 rounded-full px-2 py-0.5 text-xs font-semibold">Critical</span>;
    default:
      return <span className="bg-gray-100 text-gray-500 rounded-full px-2 py-0.5 text-xs font-semibold">{priority}</span>;
  }
};

const statusBadge = (status) => {
  switch (status) {
    case "Under Review":
      return <span className="bg-blue-100 text-blue-600 rounded-full px-2 py-0.5 text-xs font-semibold">Under Review</span>;
    case "Resolved":
      return <span className="bg-green-100 text-green-600 rounded-full px-2 py-0.5 text-xs font-semibold">Resolved</span>;
    case "Investigating":
      return <span className="bg-yellow-100 text-yellow-700 rounded-full px-2 py-0.5 text-xs font-semibold">Investigating</span>;
    case "Pending":
      return <span className="bg-red-100 text-red-500 rounded-full px-2 py-0.5 text-xs font-semibold">Pending</span>;
    default:
      return <span className="bg-gray-100 text-gray-500 rounded-full px-2 py-0.5 text-xs font-semibold">{status}</span>;
  }
};

const AdminReportsTable = () => {
  const [search, setSearch] = useState("");
  const filteredReports = DEMO_REPORTS.filter(
    r =>
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.type.toLowerCase().includes(search.toLowerCase()) ||
      r.reporter.toLowerCase().includes(search.toLowerCase()) ||
      r.reported.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full">
      {/* Section Title */}
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-gray-900">Reports & Violations</h2>
        <div className="text-gray-500 font-normal text-base">Manage customer reports and platform violations</div>
      </div>
      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-7">
        {DEMO_REPORT_STATS.map((k, i) => (
          <div key={i} className={`rounded-xl px-6 py-5 flex items-center gap-4 min-w-[160px] ${k.className}`}>
            <div>{k.icon}</div>
            <div>
              <div className="text-gray-500 text-[.98rem] font-medium">{k.label}</div>
              <div className="text-2xl font-extrabold text-gray-900">{k.value}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
        <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden max-w-md">
          <svg className="text-gray-400 w-5 h-5 ml-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search reports..."
            className="w-full px-3 py-2 text-sm bg-transparent rounded-lg outline-none"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button
          onClick={() => window.alert('Filter not implemented (demo only).')}
          className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium bg-white hover:bg-gray-100 transition ml-auto"
        >
          <Filter size={18} className="text-gray-500" />
          Filter
        </button>
      </div>
      {/* Table */}
      <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-xs text-gray-400 font-semibold border-b">
              <th className="pl-6 py-3 text-left">REPORT ID</th>
              <th className="py-3 text-left">TYPE</th>
              <th className="py-3 text-left">REPORTER</th>
              <th className="py-3 text-left">REPORTED</th>
              <th className="py-3 text-left">PRIORITY</th>
              <th className="py-3 text-left">STATUS</th>
              <th className="py-3 text-left">DATE</th>
              <th className="py-3 text-left">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="text-gray-900">
            {filteredReports.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-6 text-center text-gray-400">
                  No reports found.
                </td>
              </tr>
            ) : (
              filteredReports.map(report => (
                <tr key={report.id} className="border-b last:border-0 hover:bg-gray-50 transition">
                  <td className="pl-6 py-3 font-semibold">{report.id}</td>
                  <td className="py-3">{report.type}</td>
                  <td className="py-3">{report.reporter}</td>
                  <td className="py-3">{report.reported}</td>
                  <td className="py-3">{priorityBadge(report.priority)}</td>
                  <td className="py-3">{statusBadge(report.status)}</td>
                  <td className="py-3">{report.date}</td>
                  <td className="py-3">
                    <button
                      className="p-1.5 rounded-full hover:bg-gray-100 transition text-gray-500"
                      title="View"
                      onClick={() => window.alert('View report functionality not implemented (demo only).')}
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReportsTable;
