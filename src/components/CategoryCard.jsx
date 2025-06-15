
import React from "react";
import ProductCard from "./ProductCard.jsx";

const CategoryCard = ({ category, onProductClick }) => (
  <div className="bg-white rounded-2xl p-5 flex flex-col gap-3 min-h-[280px] shadow-sm border border-neutral-100 hover:shadow-lg transition-shadow">
    <div className="flex items-center gap-2 mb-2">
      <span className="text-3xl">{category.icon}</span>
      <span className="text-lg font-semibold">{category.title}</span>
    </div>
    {/* Show products for this category */}
    <div className="grid grid-cols-1 gap-3">
      {category.products.slice(0, 4).map((prod) => (
        <ProductCard
          key={prod.id}
          product={prod}
          minimal
          onClick={() => onProductClick(prod)}
        />
      ))}
    </div>
  </div>
);

export default CategoryCard;

