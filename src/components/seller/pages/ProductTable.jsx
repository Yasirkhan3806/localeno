
import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const categoryColors = {
  "Furniture": "bg-blue-100 text-blue-800",
  "Handicrafts": "bg-yellow-100 text-yellow-800",
  "Clothing & Accessories": "bg-pink-100 text-pink-800",
  "Home Decor": "bg-green-100 text-green-800",
  "Health & Beauty": "bg-purple-100 text-purple-800"
};
const statusColors = {
  "Active": "bg-green-100 text-green-800",
  "In Review": "bg-yellow-100 text-yellow-800",
  "Rejected": "bg-red-100 text-red-800"
};

function ProductTable({
  products = [],
  onEdit,
  onDelete,
  onViewDetail,
  mobile
}) {
  if (!products.length) {
    return (
      <div className="w-full text-center py-12 text-gray-400">No products found.</div>
    );
  }


  // Mobile layout - card list
  if (mobile) {
    return (
      <div className="flex flex-col gap-4">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-sm p-4 flex flex-col gap-3 border"
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border">
                <img
                  src={product?.productsData?.images[0]}
                  alt={product?.productsData?.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="font-semibold text-gray-900 truncate" title={product?.productsData?.name}>
                  {product?.productsData?.name}
                </div>
                <span className={`mt-1 px-2 py-1 rounded-full text-xs font-semibold ${categoryColors[product?.productsData?.category] || "bg-gray-100 text-gray-600"}`}>
                  {product?.productsData?.category}
                </span>
                <span className="mt-2 font-bold text-gray-800">${product?.productsData?.price}</span>
                <div className="text-xs mt-1">
                  {product?.productsData?.stock > 0
                    ? <span className="text-green-700">{product?.productsData?.stock} in stock</span>
                    : <span className="text-red-600">Out of stock</span>}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-between pt-1 border-t mt-3">
              <span className={`px-2 py-1 text-xs rounded-full font-semibold ${statusColors[product?.productsData?.status] || "bg-gray-100 text-gray-600"}`}>
                {product?.productsData?.status}
              </span>
              <span className="text-gray-500 text-xs">{product?.productsData?.dateAdded}</span>
              <div className="flex gap-2 ml-auto">
                <button
                  onClick={() => onViewDetail(product?.productsData)}
                  className="p-2 rounded-full hover:bg-gray-100 focus:ring-2 transition"
                  aria-label="View details"
                >
                  <Eye className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={() => onEdit(product)}
                  className="p-2 rounded-full hover:bg-gray-100 focus:ring-2 transition"
                  aria-label="Edit"
                >
                  <Pencil className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={() => onDelete(product)}
                  className="p-2 rounded-full hover:bg-gray-100 focus:ring-2 transition"
                  aria-label="Delete"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Desktop/tablet layout - table
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-x-auto min-w-full border">
      <Table className="min-w-[700px] md:min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-24">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date Added</TableHead>
            <TableHead className="text-right w-24">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map(product => (
            <TableRow key={product.id} className="hover:bg-gray-50 transition">
              <TableCell>
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center border">
                  <img
                    src={product?.productsData?.images[0]}
                    alt={product?.productsData?.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className="font-semibold text-gray-900 truncate max-w-[180px]" title={product?.productsData?.name}>
                  {product?.productsData?.name}
                </div>
                {product?.productsData?.rentable && (
                  <span className="block text-xs mt-1 text-blue-500">Available for rent</span>
                )}
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${categoryColors[product?.productsData?.category] || "bg-gray-100 text-gray-600"}`}>
                  {product?.productsData?.category}
                </span>
              </TableCell>
              <TableCell>
                <span className="font-bold text-gray-800">${product?.productsData?.price}</span>
              </TableCell>
              <TableCell>
                {product?.productsData?.stock > 0 ? (
                  <span className="text-green-700 font-medium">{product?.productsData?.stock} in stock</span>
                ) : (
                  <span className="text-red-600 font-medium">Out of stock</span>
                )}
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 text-xs rounded-full font-semibold ${statusColors[product?.productsData?.status] || "bg-gray-100 text-gray-600"}`}>
                  {product?.productsData?.status}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-gray-500 text-xs">{product?.productsData?.dateAdded}</span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onViewDetail(product?.productsData)}
                    className="p-2 rounded-full hover:bg-gray-100 focus:ring-2 transition"
                    aria-label="View details"
                  >
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => onEdit(product)}
                    className="p-2 rounded-full hover:bg-gray-100 focus:ring-2 transition"
                    aria-label="Edit"
                  >
                    <Pencil className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => onDelete(product)}
                    className="p-2 rounded-full hover:bg-gray-100 focus:ring-2 transition"
                    aria-label="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ProductTable;

