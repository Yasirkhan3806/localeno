
import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({
  products,
  onEdit,
  onDelete,
  onViewDetail,
  mobile
}) => {
  if (!products.length) {
    return (
      <div className="text-center mt-16 text-gray-400">No products found.</div>
    );
  }
  return (
    <div
      className={`
        grid gap-4
        ${mobile
          ? "grid-cols-1"
          : "sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
        }
      `}
    >
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={() => onEdit(product)}
          onDelete={() => onDelete(product)}
          onViewDetail={() => onViewDetail(product)}
          mobile={mobile}
        />
      ))}
    </div>
  );
};

export default ProductList;
