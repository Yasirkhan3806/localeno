
// Mock products organized by categories
export const allProducts = [
  // Handicrafts (10 products)
  { id: 1, name: 'Handwoven Ceramic Bowl', price: 45, rentPrice: 5, image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&q=80', category: 'Handicrafts', rating: 4.8, reviews: 89, inStock: true, isRentable: true },
  { id: 2, name: 'Traditional Wood Carving', price: 120, rentPrice: 12, image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&q=80', category: 'Handicrafts', rating: 4.7, reviews: 56, inStock: true, isRentable: true },
  { id: 3, name: 'Handmade Pottery Vase', price: 65, rentPrice: 8, image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&q=80', category: 'Handicrafts', rating: 4.6, reviews: 34, inStock: false, isRentable: false },
  { id: 4, name: 'Artisan Wicker Basket', price: 35, rentPrice: 4, image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&q=80', category: 'Handicrafts', rating: 4.5, reviews: 78, inStock: true, isRentable: true },
  { id: 5, name: 'Hand-painted Canvas', price: 85, rentPrice: 10, image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&q=80', category: 'Handicrafts', rating: 4.9, reviews: 23, inStock: true, isRentable: true },
  { id: 6, name: 'Traditional Tapestry', price: 150, rentPrice: 15, image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&q=80', category: 'Handicrafts', rating: 4.4, reviews: 45, inStock: true, isRentable: true },
  { id: 7, name: 'Handcrafted Jewelry Box', price: 75, rentPrice: 8, image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&q=80', category: 'Handicrafts', rating: 4.7, reviews: 67, inStock: true, isRentable: false },
  { id: 8, name: 'Artisan Glass Sculpture', price: 200, rentPrice: 20, image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&q=80', category: 'Handicrafts', rating: 4.8, reviews: 12, inStock: false, isRentable: false },
  { id: 9, name: 'Hand-knitted Blanket', price: 90, rentPrice: 12, image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&q=80', category: 'Handicrafts', rating: 4.6, reviews: 89, inStock: true, isRentable: true },
  { id: 10, name: 'Wooden Wind Chimes', price: 25, rentPrice: 3, image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&q=80', category: 'Handicrafts', rating: 4.3, reviews: 156, inStock: true, isRentable: true },

  // Home Decor (8 products)
  { id: 11, name: 'Modern Wall Art', price: 79, rentPrice: 6, image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=300&q=80', category: 'Home Decor', rating: 4.3, reviews: 22, inStock: true, isRentable: true },
  { id: 12, name: 'Decorative Mirror', price: 120, rentPrice: 10, image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=300&q=80', category: 'Home Decor', rating: 4.5, reviews: 45, inStock: true, isRentable: true },
  { id: 13, name: 'Table Lamp', price: 65, rentPrice: 7, image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=300&q=80', category: 'Home Decor', rating: 4.7, reviews: 78, inStock: false, isRentable: false },
  { id: 14, name: 'Throw Pillows Set', price: 45, rentPrice: 5, image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=300&q=80', category: 'Home Decor', rating: 4.4, reviews: 67, inStock: true, isRentable: true },
  { id: 15, name: 'Floor Vase', price: 95, rentPrice: 8, image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=300&q=80', category: 'Home Decor', rating: 4.6, reviews: 34, inStock: true, isRentable: true },
  { id: 16, name: 'Wall Clock', price: 55, rentPrice: 6, image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=300&q=80', category: 'Home Decor', rating: 4.5, reviews: 89, inStock: true, isRentable: false },
  { id: 17, name: 'Candle Holders', price: 35, rentPrice: 4, image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=300&q=80', category: 'Home Decor', rating: 4.3, reviews: 123, inStock: true, isRentable: true },
  { id: 18, name: 'Picture Frames Set', price: 30, rentPrice: 3, image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=300&q=80', category: 'Home Decor', rating: 4.2, reviews: 78, inStock: true, isRentable: true },

  // Furniture (7 products)
  { id: 21, name: 'Handcrafted Wooden Table', price: 299, rentPrice: 25, image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=300&q=80', category: 'Furniture', rating: 4.5, reviews: 124, inStock: true, isRentable: true },
  { id: 22, name: 'Vintage Armchair', price: 450, rentPrice: 35, image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=300&q=80', category: 'Furniture', rating: 4.8, reviews: 67, inStock: true, isRentable: true },
  { id: 23, name: 'Bookshelf Unit', price: 180, rentPrice: 18, image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=300&q=80', category: 'Furniture', rating: 4.6, reviews: 89, inStock: false, isRentable: false },
  { id: 24, name: 'Coffee Table', price: 220, rentPrice: 20, image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=300&q=80', category: 'Furniture', rating: 4.7, reviews: 45, inStock: true, isRentable: true },
  { id: 25, name: 'Dining Chairs Set', price: 350, rentPrice: 30, image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=300&q=80', category: 'Furniture', rating: 4.5, reviews: 78, inStock: true, isRentable: true },
  { id: 26, name: 'Storage Ottoman', price: 95, rentPrice: 10, image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=300&q=80', category: 'Furniture', rating: 4.4, reviews: 34, inStock: true, isRentable: false },
  { id: 27, name: 'Bar Stool', price: 120, rentPrice: 12, image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=300&q=80', category: 'Furniture', rating: 4.6, reviews: 56, inStock: false, isRentable: false },

  // Health & Beauty (6 products)
  { id: 31, name: 'Organic Face Cream', price: 45, rentPrice: 0, image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=300&q=80', category: 'Health & Beauty', rating: 4.6, reviews: 51, inStock: true, isRentable: false },
  { id: 32, name: 'Natural Hair Oil', price: 35, rentPrice: 0, image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=300&q=80', category: 'Health & Beauty', rating: 4.4, reviews: 89, inStock: true, isRentable: false },
  { id: 33, name: 'Herbal Soap Set', price: 25, rentPrice: 0, image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=300&q=80', category: 'Health & Beauty', rating: 4.5, reviews: 67, inStock: false, isRentable: false },
  { id: 34, name: 'Essential Oil Kit', price: 60, rentPrice: 0, image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=300&q=80', category: 'Health & Beauty', rating: 4.7, reviews: 34, inStock: true, isRentable: false },
  { id: 35, name: 'Ayurvedic Face Mask', price: 40, rentPrice: 0, image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=300&q=80', category: 'Health & Beauty', rating: 4.3, reviews: 45, inStock: true, isRentable: false },
  { id: 36, name: 'Natural Body Scrub', price: 30, rentPrice: 0, image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=300&q=80', category: 'Health & Beauty', rating: 4.2, reviews: 78, inStock: true, isRentable: false },

  // Clothing (8 products)
  { id: 40, name: 'Traditional Embroidered Dress', price: 199, rentPrice: 20, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80', category: 'Clothing', rating: 4.3, reviews: 67, inStock: false, isRentable: false },
  { id: 41, name: 'Handwoven Silk Scarf', price: 85, rentPrice: 8, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80', category: 'Clothing', rating: 4.6, reviews: 34, inStock: true, isRentable: true },
  { id: 42, name: 'Cotton Kurta Set', price: 120, rentPrice: 12, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80', category: 'Clothing', rating: 4.5, reviews: 89, inStock: true, isRentable: true },
  { id: 43, name: 'Designer Shawl', price: 150, rentPrice: 15, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80', category: 'Clothing', rating: 4.7, reviews: 23, inStock: true, isRentable: true },
  { id: 44, name: 'Ethnic Jacket', price: 180, rentPrice: 18, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80', category: 'Clothing', rating: 4.4, reviews: 56, inStock: false, isRentable: false },
  { id: 45, name: 'Traditional Saree', price: 250, rentPrice: 25, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80', category: 'Clothing', rating: 4.8, reviews: 45, inStock: true, isRentable: true },
  { id: 46, name: 'Handloom Dupatta', price: 75, rentPrice: 8, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80', category: 'Clothing', rating: 4.3, reviews: 67, inStock: true, isRentable: true },
  { id: 47, name: 'Embroidered Blouse', price: 95, rentPrice: 10, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80', category: 'Clothing', rating: 4.5, reviews: 78, inStock: true, isRentable: false },

  // Accessories (5 products)
  { id: 50, name: 'Handmade Leather Bag', price: 149, rentPrice: 12, image: 'https://images.unsplash.com/photo-1487252665478-49b61b47f302?auto=format&fit=crop&w=300&q=80', category: 'Accessories', rating: 4.4, reviews: 40, inStock: true, isRentable: true },
  { id: 51, name: 'Silver Jewelry Set', price: 200, rentPrice: 15, image: 'https://images.unsplash.com/photo-1487252665478-49b61b47f302?auto=format&fit=crop&w=300&q=80', category: 'Accessories', rating: 4.6, reviews: 67, inStock: true, isRentable: true },
  { id: 52, name: 'Wooden Watch', price: 120, rentPrice: 10, image: 'https://images.unsplash.com/photo-1487252665478-49b61b47f302?auto=format&fit=crop&w=300&q=80', category: 'Accessories', rating: 4.3, reviews: 89, inStock: false, isRentable: false },
  { id: 53, name: 'Beaded Necklace', price: 85, rentPrice: 8, image: 'https://images.unsplash.com/photo-1487252665478-49b61b47f302?auto=format&fit=crop&w=300&q=80', category: 'Accessories', rating: 4.5, reviews: 34, inStock: true, isRentable: true },
  { id: 54, name: 'Leather Wallet', price: 65, rentPrice: 6, image: 'https://images.unsplash.com/photo-1487252665478-49b61b47f302?auto=format&fit=crop&w=300&q=80', category: 'Accessories', rating: 4.2, reviews: 56, inStock: true, isRentable: false },
];

export const categories = [
  'All Products',
  'Handicrafts',
  'Home Decor',
  'Furniture', 
  'Health & Beauty',
  'Clothing',
  'Accessories'
];
