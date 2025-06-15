
import React from 'react';

const kpiCards = [
  {
    label: "Revenue",
    value: "$8,230",
    diff: "+15%",
    desc: "vs last week",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="14" width="4" height="7" rx="1" className="fill-blue-600" />
        <rect x="9" y="10" width="4" height="11" rx="1" className="fill-indigo-500" />
        <rect x="15" y="6" width="4" height="15" rx="1" className="fill-black" />
      </svg>
    ),
  },
  {
    label: "Orders",
    value: "132",
    diff: "+8%",
    desc: "this month",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="6" width="8" height="14" rx="2" className="fill-indigo-500" />
        <rect x="13" y="9" width="8" height="11" rx="2" className="fill-blue-600" />
      </svg>
    ),
  },
  {
    label: "Customers",
    value: "87",
    diff: "+3",
    desc: "new customers",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="8" cy="8" r="4" className="fill-indigo-400" />
        <circle cx="18" cy="8" r="4" className="fill-blue-600" />
        <rect x="2" y="16" width="20" height="5" rx="2" className="fill-black" />
      </svg>
    ),
  },
  {
    label: "Products",
    value: "6",
    diff: "+1",
    desc: "added today",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="4" y="7" width="16" height="12" rx="3" className="fill-indigo-500" />
        <path d="M8 7V5a4 4 0 1 1 8 0v2" className="stroke-black" />
      </svg>
    ),
  },
];

const recentOrders = [
  { id: "ORD1021", product: "Silk Scarf", customer: "Neha Patel", total: 79.99, status: "Paid", date: "2024-05-28" },
  { id: "ORD1019", product: "Wooden Dining Table", customer: "Divya Garg", total: 899.99, status: "Paid", date: "2024-05-28" },
  { id: "ORD1015", product: "Handcrafted Wooden Chair", customer: "Akshay Kumar", total: 299.99, status: "Refunded", date: "2024-05-27" },
  { id: "ORD1012", product: "Pottery Vase", customer: "Rekha Singh", total: 89.99, status: "Paid", date: "2024-05-26" },
];

const statusColors = {
  Paid: "bg-green-100 text-green-800",
  Refunded: "bg-red-100 text-red-700"
};

const AdminDashboard = () => (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpiCards.map(card => (
        <div key={card.label} className="p-6 rounded-2xl bg-gradient-to-tr from-indigo-500 to-black text-white shadow flex flex-col gap-2 min-w-[170px] relative overflow-hidden">
          <span className="absolute right-4 top-4 opacity-20">{card.icon}</span>
          <div className="font-medium text-[1.05rem]">{card.label}</div>
          <div className="text-3xl font-black">{card.value}</div>
          <div className="flex items-center gap-3 text-xs font-medium">
            <span className="bg-white/10 px-2 rounded text-green-200 tracking-wider">{card.diff}</span>
            <span className="text-slate-200">{card.desc}</span>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-8 rounded-xl bg-white shadow border border-gray-100">
      <div className="flex justify-between items-center border-b px-6 py-4">
        <span className="font-semibold text-xl text-gray-900">Recent Orders</span>
        <a href="#" className="text-sm font-semibold text-primary hover:underline">View All</a>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-400 text-xs border-b">
            <th className="py-3 text-left px-6">Order ID</th>
            <th className="py-3 text-left">Product</th>
            <th className="py-3 text-left">Customer</th>
            <th className="py-3 text-left">Total</th>
            <th className="py-3 text-left">Status</th>
            <th className="py-3 text-left">Date</th>
          </tr>
        </thead>
        <tbody className="text-gray-900">
          {recentOrders.map((order) => (
            <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50 transition">
              <td className="py-3 px-6 font-semibold text-primary">{order.id}</td>
              <td className="py-3">{order.product}</td>
              <td className="py-3">{order.customer}</td>
              <td className="py-3">${order.total.toFixed(2)}</td>
              <td className="py-3">
                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>{order.status}</span>
              </td>
              <td className="py-3">{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);

export default AdminDashboard;
