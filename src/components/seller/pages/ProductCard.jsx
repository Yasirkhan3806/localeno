
import React from "react";
import PropTypes from "prop-types";
import { Edit, Trash2, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

const CATEGORY_COLORS = {
  "Furniture": "bg-indigo-100 text-indigo-700",
  "Handicrafts": "bg-yellow-100 text-yellow-800",
  "Clothing & Accessories": "bg-pink-50 text-pink-700",
  "Home Decor": "bg-teal-50 text-teal-700",
  "Health & Beauty": "bg-green-100 text-green-800"
};

const STATUS_COLORS = {
  "Active": "bg-green-100 text-green-700",
  "In Review": "bg-orange-100 text-orange-700",
  "Rejected": "bg-red-100 text-red-700"
};

const ProductCard = ({
  product,
  onEdit,
  onDelete,
  onViewDetail,
  mobile,
}) => {
  return (
    <div
      className={
        `bg-white rounded-2xl shadow-md p-4 flex flex-col gap-4 transition 
        animate-fade-in
        hover:shadow-lg hover:scale-105 duration-200
        ` +
        (mobile ? " w-full" : " w-full h-full")
      }
      tabIndex={0}
      aria-label={`${product.name} (${product.category})`}
      style={{ animationDuration: "0.28s" }}
    >
      <div className="flex gap-4">
        <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={`Preview of ${product.name}`}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge className={`rounded px-2 py-0.5 ${CATEGORY_COLORS[product.category]}`} variant="secondary">
              {product.category}
            </Badge>
            <span className={`ml-2 px-2 py-0.5 text-xs font-semibold ${STATUS_COLORS[product.status]} rounded`}>
              {product.status}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 text-base line-clamp-2 min-h-[2.8em]">
            {product.name}
          </h3>
          <div className="text-gray-700 font-bold text-lg mt-auto">${product.price}</div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-auto">
        <span className={`text-xs ${product.stock > 0 ? "text-green-700" : "text-red-500"} font-medium`}>
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </span>
        <span className="text-xs text-gray-400">{product.dateAdded}</span>
      </div>
      <div className="flex justify-end gap-2 mt-2">
        <button
          className={buttonVariants({ variant: "ghost", className: "rounded-full p-2 hover:bg-accent transition hover:scale-110" })}
          aria-label="Edit product"
          onClick={onEdit}
        >
          <Edit size={18} className="text-gray-700" />
        </button>
        <button
          className={buttonVariants({ variant: "ghost", className: "rounded-full p-2 hover:bg-red-100 transition hover:scale-110" })}
          aria-label="Delete product"
          onClick={onDelete}
        >
          <Trash2 size={18} className="text-red-600" />
        </button>
        <button
          className={buttonVariants({ variant: "ghost", className: "rounded-full p-2 hover:bg-accent transition hover:scale-110" })}
          aria-label="View product detail"
          onClick={onViewDetail}
        >
          <Package size={18} className="text-gray-700" />
        </button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onViewDetail: PropTypes.func,
  mobile: PropTypes.bool,
};

export default ProductCard;
