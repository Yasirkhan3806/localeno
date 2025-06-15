
import React from "react";

const rentalStats = [
  {
    label: "Total Products on Rent",
    value: 1,
    icon: (
      <span className="inline-block p-2 rounded-full bg-green-100">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2"/>
          <path strokeWidth="2" d="M9 9h6v6H9z"/>
        </svg>
      </span>
    ),
    valueClass: "text-green-600"
  },
  {
    label: "Overdue Returns",
    value: 1,
    icon: (
      <span className="inline-block p-2 rounded-full bg-red-100">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <path strokeWidth="2" d="M12 8v4l2 2" />
        </svg>
      </span>
    ),
    valueClass: "text-red-600"
  },
  {
    label: "Daily Rental Income",
    value: "$35",
    icon: (
      <span className="inline-block p-2 rounded-full bg-gray-100">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="2"/>
          <path strokeWidth="2" d="M8 10h.01M16 10h.01M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" />
        </svg>
      </span>
    ),
    valueClass: "text-black font-bold"
  }
];

const dummyRentals = [
  {
    product: {
      name: "MacBook Pro 16-inch",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=128&q=80"
    },
    customer: {
      name: "John Smith",
      city: "New York, NY"
    },
    period: "6/15/2024 - 6/22/2024",
    rate: "$50/day",
    amount: "$350",
    status: "Pending"
  },
  {
    product: {
      name: "Canon EOS R Camera",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=128&q=80"
    },
    customer: {
      name: "Sarah Johnson",
      city: "Los Angeles, CA"
    },
    period: "6/10/2024 - 6/17/2024",
    rate: "$35/day",
    amount: "$245",
    status: "Rented"
  },
  {
    product: {
      name: "Professional Tripod",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=128&q=80"
    },
    customer: {
      name: "Mike Chen",
      city: "Chicago, IL"
    },
    period: "6/1/2024 - 6/8/2024",
    rate: "$8/day",
    amount: "$56",
    status: "Returned"
  },
  {
    product: {
      name: "Wireless Gaming Mouse",
      image: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=128&q=80"
    },
    customer: {
      name: "Emma Davis",
      city: "Austin, TX"
    },
    period: "6/20/2024 - 6/27/2024",
    rate: "$5/day",
    amount: "$35",
    status: "Overdue"
  }
];

const statusBadgeClass = {
  Pending: "bg-gray-100 text-gray-700",
  Rented: "bg-green-100 text-green-700",
  Returned: "bg-blue-100 text-blue-700",
  Overdue: "bg-red-100 text-red-700"
};

export default function SellerRentals() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Top Stat Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {rentalStats.map(stat => (
          <div key={stat.label} className="bg-white rounded-xl px-6 py-5 flex items-center shadow border">
            {stat.icon}
            <div className="ml-4">
              <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
              <div className={`text-xl font-bold mt-1 ${stat.valueClass}`}>{stat.value}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Rental Requests Table Card */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-x-auto">
        <div className="px-6 py-5 border-b">
          <h2 className="font-bold text-xl text-gray-900">Rental Requests</h2>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="text-xs text-gray-500 font-medium border-b">
                <th className="px-6 py-3 text-left font-semibold">PRODUCT</th>
                <th className="px-6 py-3 text-left font-semibold">CUSTOMER</th>
                <th className="px-6 py-3 text-left font-semibold">RENTAL PERIOD</th>
                <th className="px-6 py-3 text-left font-semibold">AMOUNT</th>
                <th className="px-6 py-3 text-left font-semibold">STATUS</th>
                <th className="px-6 py-3 text-left font-semibold">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {dummyRentals.map((r, i) => (
                <tr key={i} className="border-b last:border-b-0 hover:bg-gray-50 transition group">
                  {/* PRODUCT */}
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img src={r.product.image} alt={r.product.name} className="w-12 h-12 rounded-lg object-cover border" />
                    <span className="font-semibold text-gray-900">{r.product.name}</span>
                  </td>
                  {/* CUSTOMER */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="flex items-center gap-1 text-gray-900 font-medium">
                        <svg width={16} height={16} className="text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="7" r="4" strokeWidth="2" />
                          <path strokeWidth="2" d="M17 21a5 5 0 0 0-10 0" />
                        </svg>
                        {r.customer.name}
                      </span>
                      <span className="text-gray-500 text-xs flex items-center gap-1 mt-0.5">
                        <svg width={15} height={15} className="text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                          <path strokeWidth="2" d="M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7z" />
                          <circle cx="12" cy="9" r="2.5" />
                        </svg>
                        {r.customer.city}
                      </span>
                    </div>
                  </td>
                  {/* RENTAL PERIOD */}
                  <td className="px-6 py-4 text-gray-900">
                    <div className="font-medium">{r.period}</div>
                    <div className="text-xs text-gray-500">{r.rate}</div>
                  </td>
                  {/* AMOUNT */}
                  <td className="px-6 py-4 font-bold text-black">{r.amount}</td>
                  {/* STATUS */}
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeClass[r.status] || "bg-gray-100 text-gray-700"}`}>{r.status}</span>
                  </td>
                  {/* ACTIONS */}
                  <td className="px-6 py-4">
                    {r.status === "Pending" && (
                      <div className="flex gap-2">
                        <button className="flex items-center gap-1 px-4 py-1 rounded bg-green-600 hover:bg-green-700 text-white font-semibold text-sm">
                          <svg width={16} height={16} stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path strokeWidth="2" d="m5 13 4 4L19 7"/>
                          </svg>
                          Accept
                        </button>
                        <button className="flex items-center gap-1 px-4 py-1 rounded bg-red-600 hover:bg-red-700 text-white font-semibold text-sm">
                          <svg width={16} height={16} stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path strokeWidth="2" d="M18 6 6 18"/>
                            <path strokeWidth="2" d="M6 6l12 12"/>
                          </svg>
                          Decline
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
