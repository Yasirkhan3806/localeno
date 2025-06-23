import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [contextCart, setContextCart] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('user_cart');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const [cartLoading, setLoading] = useState(false);
  const isFirstRender = useRef(true);

  const addToCart = (product) => {
    setLoading(true);
    setContextCart((prev) => {
      if (prev.some(item => item.id === product.id)) {
        setLoading(false);
        return prev;
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setContextCart((prev) => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => setContextCart([]);

  const updateQuantity = (productId, change) => {
    setContextCart((prev) =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
      )
    );
  };

  const getCartTotal = () => {
    return contextCart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem('user_cart', JSON.stringify(contextCart));
    setLoading(false);
  }, [contextCart]);

  return (
    <CartContext.Provider value={{ contextCart, addToCart, removeFromCart, clearCart, updateQuantity, getCartTotal, cartLoading }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
