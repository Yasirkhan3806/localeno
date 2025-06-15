
import React from "react";
export default function SellerRentals() {
  // slide/fade for table or card
  return (
    <div className="w-full max-w-5xl mx-auto">
      <h2 className="font-bold text-xl mb-6 text-gray-900">Rental Management</h2>
      {/* Desktop */}
      <div className="hidden md:block">
        <table className="w-full bg-white rounded-xl shadow">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Renter Info</th>
              <th className="px-4 py-3 text-left">Duration</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder */}
            <tr>
              <td className="px-4 py-3">Camera Pro</td>
              <td className="px-4 py-3">Jane Doe</td>
              <td className="px-4 py-3">7 days</td>
              <td className="px-4 py-3">Active</td>
              <td className="px-4 py-3">
                <button className="px-2 py-1 rounded bg-green-100 hover:bg-green-200 text-xs mr-2">Mark Returned</button>
                <button className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-xs">Extend</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Mobile */}
      <div className="md:hidden flex flex-col gap-4">
        <div className="bg-white rounded-xl shadow p-4">
          <div className="font-semibold mb-2">Camera Pro</div>
          <div className="text-xs text-gray-500">Renter: Jane Doe</div>
          <div className="text-xs">Duration: 7 days</div>
          <div className="text-xs mt-1">Status: <span className="text-green-700 font-bold">Active</span></div>
          <div className="flex gap-2 mt-2">
            <button className="flex-1 px-2 py-1 rounded bg-green-100 hover:bg-green-200 text-xs">Mark Returned</button>
            <button className="flex-1 px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-xs">Extend</button>
          </div>
        </div>
      </div>
    </div>
  );
}
