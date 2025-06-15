
import React, { useState } from "react";
import { Eye, Edit, MoreHorizontal, Filter as FilterIcon, Plus } from "lucide-react";
import ProductDetailModal from "./ProductDetailModal";

const STATUS_STYLES = {
  Active: "bg-green-100 text-green-600",
  "Low Stock": "bg-yellow-100 text-yellow-700",
  "Out of Stock": "bg-red-100 text-red-600",
};

const AdminProductTable = ({ products, onEditProduct, onViewProduct }) => {
  const [searchText, setSearchText] = useState("");
  const [filterActive, setFilterActive] = useState(false);
  const [viewProduct, setViewProduct] = useState(null);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAddProduct = () => {
    window.alert("Add Product functionality will be implemented soon!");
    // You can implement actual product addition logic here
  };

  const handleEditProduct = (product) => {
    window.alert(`Edit Product: ${product.name}\nThis functionality will be implemented soon!`);
    // You can implement actual product editing logic here
  };

  const handleMoreActions = (product) => {
    const action = window.confirm(`More actions for "${product.name}":\n\nClick OK to delete or Cancel to duplicate`);
    if (action) {
      window.alert(`Delete "${product.name}" - This functionality will be implemented soon!`);
    } else {
      window.alert(`Duplicate "${product.name}" - This functionality will be implemented soon!`);
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex gap-2">
          <input
            className="bg-white border border-gray-200 rounded-lg px-4 py-2 placeholder-gray-400 focus:ring-2 focus:ring-black focus:outline-none text-sm transition"
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
            Filter
          </button>
        </div>
        <button
          className="ml-auto flex items-center gap-2 px-5 py-2 rounded-lg bg-black text-white font-semibold shadow hover:bg-gray-900 transition"
          onClick={handleAddProduct}
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      <div className="w-full bg-white rounded-xl shadow border border-gray-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 text-xs font-semibold border-b">
              <th className="px-4 py-3 text-left font-semibold">PRODUCT</th>
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
                <td className="px-4 py-3 font-medium flex items-center gap-3 min-w-[230px]">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-10 h-10 object-cover rounded-lg border border-gray-200"
                    loading="lazy"
                  />
                  <span>{p.name}</span>
                </td>
                <td className="px-4 py-3">{p.category}</td>
                <td className="px-4 py-3">${p.price.toFixed(2)}</td>
                <td className="px-4 py-3">{p.stock}</td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${STATUS_STYLES[p.status] || "bg-gray-200 text-gray-600"}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
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
                      onClick={() => handleEditProduct(p)}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="p-1.5 rounded-full hover:bg-gray-100 transition text-gray-500"
                      title="More actions"
                      onClick={() => handleMoreActions(p)}
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
      {/* Product detail modal */}
      <ProductDetailModal
        product={viewProduct}
        open={!!viewProduct}
        onClose={() => setViewProduct(null)}
      />
    </>
  );
};

export default AdminProductTable;
