
import React from "react";
import CategoryCard from "./CategoryCard.js";

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
  },
  {
    title: "Home & Living",
    icon: "🏠",
    products: [
      { id: 9, name: "Modern Lamp", image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&q=80", price: "$32" },
      { id: 10, name: "Cushion Set", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=300&q=80", price: "$19" }
    ]
  }
];

const CategoriesGrid = ({ onProductClick }) => (
  <section className="container mx-auto px-4 max-w-6xl">
    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Shop by Category</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 animate-fade-in">
      {categories.map((cat) => (
        <CategoryCard
          key={cat.title}
          category={cat}
          onProductClick={onProductClick}
        />
      ))}
    </div>
  </section>
);

export default CategoriesGrid;
