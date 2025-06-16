
import React, { useState } from "react";
import { Eye, Edit, MoreHorizontal, Filter as FilterIcon, Plus } from "lucide-react";
import ViewDetailModal from "./ViewDetailModal";

const STATUS_STYLES = {
  Active: "bg-green-100 text-green-600",
  "Low Stock": "bg-yellow-100 text-yellow-700",
  "Out of Stock": "bg-red-100 text-red-600",
};

const AdminProductTable = ({ products, onEditProduct, onViewProduct, onAddProduct, onProductActions }) => {
  const [searchText, setSearchText] = useState("");
  const [filterActive, setFilterActive] = useState(false);
  const [viewProduct, setViewProduct] = useState(null);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 mb-6">
        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
          <input
            className="bg-white border border-gray-200 rounded-lg px-4 py-2 placeholder-gray-400 focus:ring-2 focus:ring-black focus:outline-none text-sm transition w-full sm:w-auto"
            placeholder="Search products..."
            value={searchText}
            style={{ minWidth: 220 }}
            onChange={e => setSearchText(e.target.value)}
          />
          <button
            onClick={() => setFilterActive((prev) => !prev)}
            className={`flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium bg-white hover:bg-gray-100 transition ${filterActive ? "ring-2 ring-black" : ""}`}
          >
            <FilterIcon className="text-gray-500" size={18} />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
        <button
          className="w-full lg:w-auto flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-black text-white font-semibold shadow hover:bg-gray-900 transition"
          onClick={onAddProduct}
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Add Product</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      <div className="w-full bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        {/* Mobile Cards View */}
        <div className="block lg:hidden">
          {filteredProducts.length === 0 ? (
            <div className="py-8 text-center text-gray-400">
              No products found.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredProducts.map((p) => (
                <div key={p.id} className="p-4 hover:bg-gray-50 transition">
                  <div className="flex items-start gap-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-16 h-16 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-gray-900 truncate">{p.name}</h3>
                          <p className="text-sm text-gray-500">{p.category}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-semibold text-gray-900">${p.price.toFixed(2)}</span>
                            <span className="text-sm text-gray-500">• {p.stock} in stock</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          <button
                            className="p-2 rounded-full hover:bg-gray-100 transition text-gray-500"
                            title="View product"
                            onClick={() => setViewProduct(p)}
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            className="p-2 rounded-full hover:bg-gray-100 transition text-gray-500"
                            title="Edit product"
                            onClick={() => onEditProduct(p)}
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            className="p-2 rounded-full hover:bg-gray-100 transition text-gray-500"
                            title="More actions"
                            onClick={() => onProductActions(p)}
                          >
                            <MoreHorizontal size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[p.status] || "bg-gray-200 text-gray-600"}`}>
                          {p.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 text-xs font-semibold border-b">
                <th className="px-4 py-3 text-left font-semibold min-w-[200px]">PRODUCT</th>
                <th className="px-4 py-3 text-left font-semibold">CATEGORY</th>
                <th className="px-4 py-3 text-left font-semibold">PRICE</th>
                <th className="px-4 py-3 text-left font-semibold">STOCK</th>
                <th className="px-4 py-3 text-left font-semibold">STATUS</th>
                <th className="px-4 py-3 text-left font-semibold">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="text-gray-900">
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-5 text-center text-gray-400">
                    No products found.
                  </td>
                </tr>
              )}
              {filteredProducts.map((p) => (
                <tr key={p.id} className="border-b last:border-0 hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium flex items-center gap-3 min-w-[200px]">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-10 h-10 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                      loading="lazy"
                    />
                    <span className="truncate">{p.name}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{p.category}</td>
                  <td className="px-4 py-3 whitespace-nowrap">${p.price.toFixed(2)}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{p.stock}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${STATUS_STYLES[p.status] || "bg-gray-200 text-gray-600"}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-1.5 rounded-full hover:bg-gray-100 transition text-gray-500"
                        title="View product"
                        onClick={() => setViewProduct(p)}
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        className="p-1.5 rounded-full hover:bg-gray-100 transition text-gray-500"
                        title="Edit product"
                        onClick={() => onEditProduct(p)}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className="p-1.5 rounded-full hover:bg-gray-100 transition text-gray-500"
                        title="More actions"
                        onClick={() => onProductActions(p)}
                      >
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* View Detail Modal */}
      <ViewDetailModal
        item={viewProduct}
        type="product"
        isOpen={!!viewProduct}
        onClose={() => setViewProduct(null)}
      />
    </>
  );
};

export default AdminProductTable;
