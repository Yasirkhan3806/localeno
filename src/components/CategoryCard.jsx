
import React from "react";
import ProductCard from "./ProductCard.jsx";

const CategoryCard = ({ category, onProductClick }) => (
  <div className="bg-white rounded-2xl p-6 flex flex-col shadow-xl border border-neutral-200 hover:shadow-2xl transition-shadow min-h-[340px] group relative overflow-hidden">
    <div className="flex items-center gap-3 mb-4">
      <span className="text-4xl">{category.icon}</span>
      <span className="text-xl md:text-2xl font-bold">{category.title}</span>
    </div>
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
    <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
      <span className="text-xs bg-black text-white rounded-full px-2 py-1">View more</span>
    </div>
  </div>
);

export default CategoryCard;
