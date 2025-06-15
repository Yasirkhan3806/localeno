
import React from "react";
import { Eye, Pencil, MoreVertical, Trash2 } from "lucide-react";
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
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className="font-semibold text-gray-900 truncate max-w-[180px]" title={product.name}>
                  {product.name}
                </div>
                {product.rentable && (
                  <span className="block text-xs mt-1 text-blue-500">Available for rent</span>
                )}
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${categoryColors[product.category] || "bg-gray-100 text-gray-600"}`}>
                  {product.category}
                </span>
              </TableCell>
              <TableCell>
                <span className="font-bold text-gray-800">${product.price}</span>
              </TableCell>
              <TableCell>
                {product.stock > 0 ? (
                  <span className="text-green-700 font-medium">{product.stock} in stock</span>
                ) : (
                  <span className="text-red-600 font-medium">Out of stock</span>
                )}
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 text-xs rounded-full font-semibold ${statusColors[product.status] || "bg-gray-100 text-gray-600"}`}>
                  {product.status}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-gray-500 text-xs">{product.dateAdded}</span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onViewDetail(product)}
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
                  {/* More menu (mobile/tablet) could go here */}
                  {/* <button ...><MoreVertical /></button> */}
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
