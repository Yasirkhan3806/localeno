
import React from "react";
import CategoryCard from "./CategoryCard.jsx";

// Demo category data (real UI would fetch these!)
const categories = [
  {
    title: "Electronics",
    icon: "💡",
    products: [
      { id: 1, name: "Bluetooth Speaker", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=300&q=80", price: "$49" },
      { id: 2, name: "Smart Watch", image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&q=80", price: "$98" },
      { id: 3, name: "Wireless Headphones", image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300&q=80", price: "$120" },
      { id: 4, name: "Tablet", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=300&q=80", price: "$250" }
    ]
  },
  {
    title: "Clothing",
    icon: "👗",
    products: [
      { id: 5, name: "Denim Jacket", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80", price: "$39" },
      { id: 6, name: "Summer Dress", image: "https://images.unsplash.com/photo-1487252665478-49b61b47f302?auto=format&fit=crop&w=300&q=80", price: "$29" }
    ]
  },
  {
    title: "Accessories",
    icon: "⌚",
    products: [
      { id: 7, name: "Gold Watch", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=300&q=80", price: "$150" },
      { id: 8, name: "Elegant Scarf", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80", price: "$25" }
    ]
  }
];

const CategoriesGrid = ({ onProductClick }) => (
  <section className="container mx-auto px-4 max-w-7xl py-16 bg-gradient-to-br from-gray-50 to-white">
    <div className="text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
        Shop by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Category</span>
      </h2>
      <p className="max-w-3xl mx-auto text-gray-600 text-lg md:text-xl leading-relaxed">
        Discover our carefully curated collection across premium categories. Each product is handpicked for quality and style.
      </p>
      <div className="mt-6 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
      {categories.map((cat, index) => (
        <CategoryCard
          key={cat.title}
          category={cat}
          onProductClick={onProductClick}
          index={index}
        />
      ))}
    </div>
  </section>
);

export default CategoriesGrid;
