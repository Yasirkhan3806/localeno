
import React, { useState } from 'react';
import { Eye, Ellipsis } from "lucide-react";

// Demo orders data
const DEMO_ORDERS = [
  {
    id: "#ORD-001",
    customer: "John Smith",
    date: "2024-01-15",
    amount: 125.00,
    items: 3,
    status: "Delivered",
  },
  {
    id: "#ORD-002",
    customer: "Sarah Wilson",
    date: "2024-01-14",
    amount: 89.50,
    items: 2,
    status: "Processing",
  },
  {
    id: "#ORD-003",
    customer: "Mike Johnson",
    date: "2024-01-13",
    amount: 247.25,
    items: 5,
    status: "Shipped",
  },
  {
    id: "#ORD-004",
    customer: "Emily Brown",
    date: "2024-01-12",
    amount: 156.75,
    items: 1,
    status: "Pending",
  },
];

const STATUS_STYLES = {
  "Delivered": "bg-green-100 text-green-700",
  "Processing": "bg-blue-100 text-blue-700",
  "Shipped": "bg-purple-100 text-purple-700",
  "Pending": "bg-yellow-100 text-yellow-700",
};

const AdminOrdersTable = () => {
  const [search, setSearch] = useState("");
  const [orderData] = useState(DEMO_ORDERS);

  // Filter by search
  const filteredOrders = orderData.filter(order =>
    order.id.toLowerCase().includes(search.toLowerCase())
    || order.customer.toLowerCase().includes(search.toLowerCase())
  );

  // Dummy handlers
  const handleFilter = () => {
    window.alert('Filter not implemented (demo only).');
  };
  const handleExport = () => {
    window.alert('Export CSV not implemented (demo only).');
  };
  const handleViewOrder = (order) => {
    window.alert(`View order functionality not implemented.\nOrder ID: ${order.id}`);
  };

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col md:flex-row md:items-center gap-3 justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-0">Orders</h2>
          <div className="text-gray-500 font-normal text-base">Manage customer orders and fulfillment</div>
        </div>
        <div className="flex gap-2 mt-2 md:mt-0">
          <input
            type="text"
            className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm placeholder:text-gray-400 min-w-[180px] w-full md:w-auto focus:ring-2 focus:ring-black focus:outline-none transition"
            placeholder="Search orders..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button
            onClick={handleFilter}
            className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium bg-white hover:bg-gray-100 transition"
          >
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A2 2 0 0012 15.586V19a1 1 0 01-1.447.894l-4-2A1 1 0 016 17V15.586a2 2 0 00-.293-1.465L3.293 6.707A1 1 0 013 6V4z"/>
            </svg>
            Filter
          </button>
          <button
            onClick={handleExport}
            className="inline-flex items-center px-5 py-2 rounded-lg bg-black text-white font-semibold shadow hover:bg-gray-900 transition text-sm"
          >
            Export CSV
          </button>
        </div>
      </div>
      <div className="rounded-2xl shadow border border-gray-100 bg-white overflow-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-xs text-gray-400 font-semibold border-b">
              <th className="px-6 py-3 text-left">ORDER ID</th>
              <th className="py-3 text-left">CUSTOMER</th>
              <th className="py-3 text-left">DATE</th>
              <th className="py-3 text-left">AMOUNT</th>
              <th className="py-3 text-left">ITEMS</th>
              <th className="py-3 text-left">STATUS</th>
              <th className="py-3 text-left">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="text-gray-900">
            {
              filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-5 text-center text-gray-400">
                    No orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order, idx) => (
                  <tr key={order.id} className="border-b last:border-0">
                    <td className="px-6 py-3 font-semibold text-primary">{order.id}</td>
                    <td className="py-3">{order.customer}</td>
                    <td className="py-3">{order.date}</td>
                    <td className="py-3">${order.amount.toFixed(2)}</td>
                    <td className="py-3">{order.items}</td>
                    <td className="py-3">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${STATUS_STYLES[order.status] || "bg-gray-200 text-gray-700"}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-1.5 rounded-full hover:bg-gray-100 transition text-gray-500"
                          title="View order"
                          onClick={() => handleViewOrder(order)}
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          className="p-1.5 rounded-full hover:bg-gray-100 transition text-gray-500"
                          title="More actions"
                        >
                          <Ellipsis size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdersTable;
