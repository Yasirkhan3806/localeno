
import React from "react";
import CategoryCard from "./CategoryCard.jsx";

// Categories updated as requested
const categories = [
  {
    id: "home-decor",
    title: "Home Decor",
    icon: "🏠",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=400&q=80",
    products: [
      {
        id: 1,
        name: "Modern Table Lamp",
        image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=200&q=80",
        price: "$45",
        originalPrice: "$65",
        rentPrice: "$4/day",
        inStock: true
      },
      {
        id: 2,
        name: "Decor Throw Pillow",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=200&q=80",
        price: "$19",
        originalPrice: "$29",
        rentPrice: "$2/day",
        inStock: true
      },
      {
        id: 3,
        name: "Wall Art Frame",
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=200&q=80",
        price: "$65",
        originalPrice: "$85",
        rentPrice: "$5/day",
        inStock: false
      },
      {
        id: 4,
        name: "Designer Vase",
        image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=200&q=80",
        price: "$32",
        originalPrice: "$45",
        rentPrice: "$3/day",
        inStock: true
      }
    ]
  },
  {
    id: "health-beauty",
    title: "Health and Beauty",
    icon: "💄",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=400&q=80",
    products: [
      {
        id: 5,
        name: "Aromatic Candles",
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=200&q=80",
        price: "$22",
        originalPrice: "$29",
        rentPrice: "$2/day",
        inStock: true
      },
      {
        id: 6,
        name: "Skin Care Set",
        image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=200&q=80",
        price: "$49",
        originalPrice: "$65",
        rentPrice: "$5/day",
        inStock: true
      },
      {
        id: 7,
        name: "Facial Roller",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=200&q=80",
        price: "$18",
        originalPrice: "$25",
        rentPrice: "$2/day",
        inStock: true
      },
      {
        id: 8,
        name: "Beauty Mask Pack",
        image: "https://images.unsplash.com/photo-1487252665478-49b61b47f302?auto=format&fit=crop&w=200&q=80",
        price: "$27",
        originalPrice: "$35",
        rentPrice: "$3/day",
        inStock: true
      }
    ]
  },
  {
    id: "furniture-handicrafts",
    title: "Furniture and Handicrafts",
    icon: "🪑",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=400&q=80",
    products: [
      {
        id: 9,
        name: "Wooden Rocking Chair",
        image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=200&q=80",
        price: "$120",
        originalPrice: "$180",
        rentPrice: "$15/day",
        inStock: true
      },
      {
        id: 10,
        name: "Handcrafted Basket",
        image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=200&q=80",
        price: "$35",
        originalPrice: "$49",
        rentPrice: "$4/day",
        inStock: true
      },
      {
        id: 11,
        name: "Decorative Pottery",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=200&q=80",
        price: "$48",
        originalPrice: "$65",
        rentPrice: "$5/day",
        inStock: true
      },
      {
        id: 12,
        name: "Boho Rug",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
        price: "$59",
        originalPrice: "$75",
        rentPrice: "$6/day",
        inStock: true
      }
    ]
  },
  {
    id: "clothing-accessories",
    title: "Clothing and Accessories",
    icon: "👗",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80",
    products: [
      {
        id: 13,
        name: "Summer Dress",
        image: "https://images.unsplash.com/photo-1487252665478-49b61b47f302?auto=format&fit=crop&w=200&q=80",
        price: "$29",
        originalPrice: "$45",
        rentPrice: "$3/day",
        inStock: true
      },
      {
        id: 14,
        name: "Casual Shirt",
        image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=200&q=80",
        price: "$25",
        originalPrice: "$35",
        rentPrice: "$3/day",
        inStock: true
      },
      {
        id: 15,
        name: "Denim Jacket",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=200&q=80",
        price: "$39",
        originalPrice: "$59",
        rentPrice: "$4/day",
        inStock: true
      },
      {
        id: 16,
        name: "Elegant Scarf",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
        price: "$25",
        originalPrice: "$35",
        rentPrice: "$2/day",
        inStock: true
      }
    ]
  }
];

const CategoriesGrid = ({ onProductClick }) => {
  const handleCategoryClick = (categoryId) => {
    console.log(`Navigate to /products?category=${categoryId}`);
    // In a real app, you would use react-router navigation here
  };

  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px bg-gray-300 flex-1 max-w-24"></div>
            <div className="px-6">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <span className="text-white text-xl">🛍️</span>
              </div>
            </div>
            <div className="h-px bg-gray-300 flex-1 max-w-24"></div>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-inter tracking-tight">
            Shop by Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explore products by type and find exactly what you're looking for
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CategoryCard
                category={category}
                onProductClick={onProductClick}
                onCategoryClick={() => handleCategoryClick(category.id)}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="bg-black text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesGrid;

