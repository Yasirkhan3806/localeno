
import { useState, useEffect } from 'react';

export function useCart() {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('user_cart');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('user_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      if (prev.some(item => item.id === product.id)) return prev;
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  // Increase/decrease quantity
  const updateQuantity = (productId, qty) => {
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: Math.max(1, qty) } : item
      )
    );
  };

  return { cart, addToCart, removeFromCart, clearCart, updateQuantity };
}
