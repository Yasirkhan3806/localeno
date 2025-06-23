import * as React from 'react';

export function useCart() {
  const [cart, setCart] = React.useState(() => {
    
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem('user_cart');
      return stored ? JSON.parse(stored) : [];
    }
    return [];

  });
 

  const [cartLoading, setLoading] = React.useState(false);

 const isFirstRender = React.useRef(true);

React.useEffect(() => {
  if (isFirstRender.current) {
    isFirstRender.current = false;
    return;
  }

  if (typeof window !== "undefined") {
    localStorage.setItem('user_cart', JSON.stringify(cart));
    setLoading(false);
  }
}, [cart]);


  const addToCart = (product) => {
    console.log(product)
    setLoading(true);
    setCart((prev) => {
      if (prev.some(item => item.id === product.id)) {
        setLoading(false);
        return prev;
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  // Increase/decrease quantity
  const updateQuantity = (productId, change) => {
    setCart((prev) =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
      )
    );
  };

  // Calculate cart total
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return { cart, addToCart, removeFromCart, clearCart, updateQuantity, getCartTotal, cartLoading };
}
