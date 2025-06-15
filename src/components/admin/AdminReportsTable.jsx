import React, { useState } from "react";
import { Ban, Bell, Clock, Eye, Filter } from "lucide-react";

// KPI demo stats
const DEMO_REPORT_STATS = [
  {
    label: "Total Reports",
    icon: <Ban className="w-6 h-6 text-red-400 bg-red-100 rounded p-1.5" />,
    value: 156,
    className: "bg-white border border-gray-200",
    iconBg: "bg-red-100",
  },
  {
    label: "Pending",
    icon: <Clock className="w-6 h-6 text-yellow-500 bg-yellow-100 rounded p-1.5" />,
    value: 23,
    className: "bg-white border border-gray-200",
    iconBg: "bg-yellow-100",
  },
  {
    label: "Under Review",
    icon: <Bell className="w-6 h-6 text-blue-500 bg-blue-100 rounded p-1.5" />,
    value: 45,
    className: "bg-white border border-gray-200",
    iconBg: "bg-blue-100",
  },
  {
    label: "Resolved",
    icon: <Ban className="w-6 h-6 text-green-500 bg-green-100 rounded p-1.5" />,
    value: 88,
    className: "bg-white border border-gray-200",
    iconBg: "bg-green-100",
  }
];

// Demo table data
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

// Modern badge styles
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
const statusBadge = (status) => {
  switch (status) {
    case "Under Review":
      return <span className="bg-blue-100 text-blue-600 rounded-full px-3 py-1 text-xs font-semibold">{status}</span>;
    case "Resolved":
      return <span className="bg-green-100 text-green-600 rounded-full px-3 py-1 text-xs font-semibold">{status}</span>;
    case "Investigating":
      return <span className="bg-yellow-100 text-yellow-700 rounded-full px-3 py-1 text-xs font-semibold">{status}</span>;
    case "Pending":
      return <span className="bg-red-100 text-red-500 rounded-full px-3 py-1 text-xs font-semibold">{status}</span>;
    default:
      return <span className="bg-gray-100 text-gray-500 rounded-full px-3 py-1 text-xs font-semibold">{status}</span>;
  }
};

const AdminReportsTable = ({ onViewReport }) => {
  const [search, setSearch] = useState("");
  const filteredReports = DEMO_REPORTS.filter(
    r =>
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.type.toLowerCase().includes(search.toLowerCase()) ||
      r.reporter.toLowerCase().includes(search.toLowerCase()) ||
      r.reported.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full h-full px-0 md:px-0 bg-[#F7F9FB]">
      {/* Header */}
      <div className="mb-8 mt-2">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Reports & Violations</h2>
        <p className="text-gray-500 font-normal text-base">Manage customer reports and platform violations</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-8">
        {DEMO_REPORT_STATS.map((k, i) => (
          <div
            key={i}
            className={`rounded-xl px-8 py-5 flex items-center gap-4 min-w-[160px] shadow-sm ${k.className}`}
            style={{ minHeight: 80 }}
          >
            <div className={`flex items-center justify-center rounded ${k.iconBg}`}>
              {k.icon}
            </div>
            <div>
              <div className="text-gray-500 text-[.98rem] font-medium">{k.label}</div>
              <div className="text-2xl font-extrabold text-gray-900">{k.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
        <div className="flex-1 flex items-center border border-gray-200 bg-white rounded-lg overflow-hidden max-w-md shadow-sm">
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
          className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium bg-white hover:bg-gray-100 transition ml-auto shadow-sm"
        >
          <Filter size={18} className="text-gray-500" />
          Filter
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-xs text-gray-400 font-semibold bg-white border-b">
              <th className="pl-6 py-3 text-left font-semibold">REPORT ID</th>
              <th className="py-3 text-left font-semibold">TYPE</th>
              <th className="py-3 text-left font-semibold">REPORTER</th>
              <th className="py-3 text-left font-semibold">REPORTED</th>
              <th className="py-3 text-left font-semibold">PRIORITY</th>
              <th className="py-3 text-left font-semibold">STATUS</th>
              <th className="py-3 text-left font-semibold">DATE</th>
              <th className="py-3 text-left font-semibold">ACTIONS</th>
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
                      className="p-2 rounded-full hover:bg-gray-100 transition text-gray-500"
                      title="View"
                      onClick={() => onViewReport ? onViewReport(report.id) : window.alert('View report functionality not implemented (demo only).')}
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
