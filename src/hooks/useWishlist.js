
import { useState, useEffect } from 'react';

export function useWishlist() {
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem('user_wishlist');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('user_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      if (prev.some(item => item.id === product.id)) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isWishlisted = (productId) => wishlist.some(item => item.id === productId);

  return { wishlist, toggleWishlist, isWishlisted };
}
