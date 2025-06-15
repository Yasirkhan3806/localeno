
import * as React from 'react';

export function useCart() {
  const [cart, setCart] = React.useState(() => {
    const stored = localStorage.getItem('user_cart');
    return stored ? JSON.parse(stored) : [];
  });

  React.useEffect(() => {
    localStorage.setItem('user_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: any) => {
    setCart((prev: any[]) => {
      if (prev.some(item => item.id === product.id)) return prev;
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: any) => {
    setCart((prev: any[]) => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  // Increase/decrease quantity
  const updateQuantity = (productId: any, qty: number) => {
    setCart((prev: any[]) =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: Math.max(1, qty) } : item
      )
    );
  };

  return { cart, addToCart, removeFromCart, clearCart, updateQuantity };
}
