
// Mock products organized by categories
export const allProducts = [
  // Furniture (5 products)
  { 
    id: 1, 
    name: 'Handcrafted Wooden Dining Table', 
    price: 450, 
    rentPrice: 35, 
    image: 'https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=300&q=80', 
    category: 'furniture', 
    rating: 4.8, 
    reviews: 124, 
    inStock: true, 
    isRentable: true,
    images: [
      'https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80'
    ]
  },
  { 
    id: 2, 
    name: 'Modern Leather Sofa', 
    price: 899, 
    rentPrice: 65, 
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=300&q=80', 
    category: 'furniture', 
    rating: 4.7, 
    reviews: 89, 
    inStock: true, 
    isRentable: true,
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=600&q=80'
    ]
  },
  { 
    id: 3, 
    name: 'Vintage Wooden Bookshelf', 
    price: 320, 
    rentPrice: 25, 
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=300&q=80', 
    category: 'furniture', 
    rating: 4.6, 
    reviews: 67, 
    inStock: true, 
    isRentable: true,
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80'
    ]
  },
  { 
    id: 4, 
    name: 'Elegant Coffee Table', 
    price: 280, 
    rentPrice: 22, 
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=300&q=80', 
    category: 'furniture', 
    rating: 4.5, 
    reviews: 45, 
    inStock: true, 
    isRentable: true,
    images: [
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=600&q=80'
    ]
  },
  { 
    id: 5, 
    name: 'Comfortable Armchair', 
    price: 380, 
    rentPrice: 28, 
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=300&q=80', 
    category: 'furniture', 
    rating: 4.4, 
    reviews: 78, 
    inStock: true, 
    isRentable: true,
    images: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80'
    ]
  },

  // Handicrafts (10 products)
  { id: 6, name: 'Handwoven Ceramic Bowl', price: 45, rentPrice: 5, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=300&q=80', category: 'handicrafts', rating: 4.8, reviews: 89, inStock: true, isRentable: true },
  { id: 7, name: 'Traditional Wood Carving', price: 120, rentPrice: 12, image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=300&q=80', category: 'handicrafts', rating: 4.7, reviews: 56, inStock: true, isRentable: true },
  { id: 8, name: 'Handmade Pottery Vase', price: 65, rentPrice: 8, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=300&q=80', category: 'handicrafts', rating: 4.6, reviews: 34, inStock: false, isRentable: false },
  { id: 9, name: 'Artisan Wicker Basket', price: 35, rentPrice: 4, image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=300&q=80', category: 'handicrafts', rating: 4.5, reviews: 78, inStock: true, isRentable: true },
  { id: 10, name: 'Hand-painted Canvas', price: 85, rentPrice: 10, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=300&q=80', category: 'handicrafts', rating: 4.9, reviews: 23, inStock: true, isRentable: true },
  { id: 11, name: 'Traditional Tapestry', price: 150, rentPrice: 15, image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=300&q=80', category: 'handicrafts', rating: 4.4, reviews: 45, inStock: true, isRentable: true },
  { id: 12, name: 'Handcrafted Jewelry Box', price: 75, rentPrice: 8, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=300&q=80', category: 'handicrafts', rating: 4.7, reviews: 67, inStock: true, isRentable: false },
  { id: 13, name: 'Artisan Glass Sculpture', price: 200, rentPrice: 20, image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=300&q=80', category: 'handicrafts', rating: 4.8, reviews: 12, inStock: false, isRentable: false },
  { id: 14, name: 'Hand-knitted Blanket', price: 90, rentPrice: 12, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=300&q=80', category: 'handicrafts', rating: 4.6, reviews: 89, inStock: true, isRentable: true },
  { id: 15, name: 'Wooden Wind Chimes', price: 25, rentPrice: 3, image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=300&q=80', category: 'handicrafts', rating: 4.3, reviews: 156, inStock: true, isRentable: true },

  // Home Decor (8 products)
  { id: 16, name: 'Modern Wall Art', price: 79, rentPrice: 6, image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=300&q=80', category: 'home decor', rating: 4.3, reviews: 22, inStock: true, isRentable: true },
  { id: 17, name: 'Decorative Mirror', price: 120, rentPrice: 10, image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=300&q=80', category: 'home decor', rating: 4.5, reviews: 45, inStock: true, isRentable: true },
  { id: 18, name: 'Table Lamp', price: 65, rentPrice: 7, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80', category: 'home decor', rating: 4.7, reviews: 78, inStock: false, isRentable: false },
  { id: 19, name: 'Throw Pillows Set', price: 45, rentPrice: 5, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=300&q=80', category: 'home decor', rating: 4.4, reviews: 67, inStock: true, isRentable: true },
  { id: 20, name: 'Floor Vase', price: 95, rentPrice: 8, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=300&q=80', category: 'home decor', rating: 4.6, reviews: 34, inStock: true, isRentable: true },
  { id: 21, name: 'Wall Clock', price: 55, rentPrice: 6, image: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&w=300&q=80', category: 'home decor', rating: 4.5, reviews: 89, inStock: true, isRentable: false },
  { id: 22, name: 'Candle Holders', price: 35, rentPrice: 4, image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=300&q=80', category: 'home decor', rating: 4.3, reviews: 123, inStock: true, isRentable: true },
  { id: 23, name: 'Picture Frames Set', price: 30, rentPrice: 3, image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=300&q=80', category: 'home decor', rating: 4.2, reviews: 78, inStock: true, isRentable: true },

  // Health & Beauty (6 products)
  { id: 24, name: 'Organic Face Cream', price: 45, rentPrice: 0, image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=300&q=80', category: 'health and beauty', rating: 4.6, reviews: 51, inStock: true, isRentable: false },
  { id: 25, name: 'Natural Hair Oil', price: 35, rentPrice: 0, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=300&q=80', category: 'health and beauty', rating: 4.4, reviews: 89, inStock: true, isRentable: false },
  { id: 26, name: 'Herbal Soap Set', price: 25, rentPrice: 0, image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=300&q=80', category: 'health and beauty', rating: 4.5, reviews: 67, inStock: false, isRentable: false },
  { id: 27, name: 'Essential Oil Kit', price: 60, rentPrice: 0, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=300&q=80', category: 'health and beauty', rating: 4.7, reviews: 34, inStock: true, isRentable: false },
  { id: 28, name: 'Ayurvedic Face Mask', price: 40, rentPrice: 0, image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=300&q=80', category: 'health and beauty', rating: 4.3, reviews: 45, inStock: true, isRentable: false },
  { id: 29, name: 'Natural Body Scrub', price: 30, rentPrice: 0, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=300&q=80', category: 'health and beauty', rating: 4.2, reviews: 78, inStock: true, isRentable: false },

  // Clothing Accessories (8 products)
  { id: 30, name: 'Handmade Leather Bag', price: 149, rentPrice: 12, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=300&q=80', category: 'clothing accessories', rating: 4.4, reviews: 40, inStock: true, isRentable: true },
  { id: 31, name: 'Silver Jewelry Set', price: 200, rentPrice: 15, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=300&q=80', category: 'clothing accessories', rating: 4.6, reviews: 67, inStock: true, isRentable: true },
  { id: 32, name: 'Wooden Watch', price: 120, rentPrice: 10, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=300&q=80', category: 'clothing accessories', rating: 4.3, reviews: 89, inStock: false, isRentable: false },
  { id: 33, name: 'Beaded Necklace', price: 85, rentPrice: 8, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=300&q=80', category: 'clothing accessories', rating: 4.5, reviews: 34, inStock: true, isRentable: true },
  { id: 34, name: 'Leather Wallet', price: 65, rentPrice: 6, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=300&q=80', category: 'clothing accessories', rating: 4.2, reviews: 56, inStock: true, isRentable: false },
  { id: 35, name: 'Silk Scarf', price: 85, rentPrice: 8, image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?auto=format&fit=crop&w=300&q=80', category: 'clothing accessories', rating: 4.6, reviews: 43, inStock: true, isRentable: true },
  { id: 36, name: 'Designer Sunglasses', price: 180, rentPrice: 15, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=300&q=80', category: 'clothing accessories', rating: 4.7, reviews: 29, inStock: true, isRentable: true },
  { id: 37, name: 'Vintage Belt', price: 75, rentPrice: 7, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=300&q=80', category: 'clothing accessories', rating: 4.4, reviews: 52, inStock: true, isRentable: false },
];

export const categories = [
  'All Products',
  'furniture',
  'handicrafts',
  'home decor',
  'health and beauty',
  'clothing accessories'
];
