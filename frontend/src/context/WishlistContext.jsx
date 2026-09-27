import React, { createContext, useContext, useState, useEffect } from 'react';
import { wishlistService } from '../services/extraServices';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchWishlist = async () => {
        try {
          setLoading(true);
          const data = await wishlistService.getWishlist();
          if (data.success) {
            setWishlist(data.wishlist || []);
          }
        } catch (err) {
          console.error('Failed to load wishlist:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchWishlist();
    } else {
      setWishlist([]);
    }
  }, [user]);

  const toggleWishlist = async (car) => {
    if (!user) {
      showToast('Please login to save cars to your wishlist', 'info');
      return false;
    }

    try {
      const carId = car._id || car;
      const data = await wishlistService.toggleWishlist(carId);
      if (data.success) {
        setWishlist(data.wishlist);
        if (data.isWishlisted) {
          showToast('Added to your wishlist!', 'success');
        } else {
          showToast('Removed from your wishlist', 'info');
        }
        return data.isWishlisted;
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
    return false;
  };

  const isWishlisted = (carId) => {
    return wishlist.some((item) => (item._id || item) === carId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};
