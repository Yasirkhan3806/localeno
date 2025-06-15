
import React from "react";
export default function SellerProducts() {
  // Desktop = table, mobile = stacked cards (use Tailwind responsive utilities)
  return (
    <div className="w-full max-w-5xl mx-auto">
      <h2 className="font-bold text-xl mb-6 text-gray-900">My Products</h2>
      {/* Placeholder table for now */}
      <div className="hidden md:block">
        <table className="w-full rounded-xl shadow bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Stock</th>
              <th className="px-4 py-3 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder row */}
            <tr>
              <td className="p-3">
                <div className="w-10 h-10 bg-gray-200 rounded-md" />
              </td>
              <td className="p-3 font-semibold">MacBook Air</td>
              <td className="p-3">Electronics</td>
              <td className="p-3">$1200</td>
              <td className="p-3">In Stock</td>
              <td className="p-3">
                <button className="mr-2 px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-sm">Edit</button>
                <button className="px-3 py-1 rounded bg-red-100 hover:bg-red-200 text-sm text-red-700">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Mobile cards */}
      <div className="md:hidden flex flex-col gap-4">
        <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-md" />
          <div>
            <div className="font-semibold">MacBook Air</div>
            <div className="text-xs text-gray-500">Electronics</div>
            <div className="text-sm font-medium mt-1">$1200</div>
            <div className="text-xs text-gray-400 mt-1">In Stock</div>
          </div>
          <div className="ml-auto flex flex-col gap-1">
            <button className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-xs">Edit</button>
            <button className="px-2 py-1 rounded bg-red-100 hover:bg-red-200 text-xs text-red-700">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
