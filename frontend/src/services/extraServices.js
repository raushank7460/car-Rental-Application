import api from './api';

export const paymentService = {
  processPayment: async (data) => {
    const response = await api.post('/payments/process', data);
    return response.data;
  },
};

export const reviewService = {
  getReviewsByCar: async (carId) => {
    const response = await api.get(`/reviews/car/${carId}`);
    return response.data;
  },
  addReview: async (reviewData) => {
    const response = await api.post('/reviews', reviewData);
    return response.data;
  },
};

export const wishlistService = {
  getWishlist: async () => {
    const response = await api.get('/wishlist');
    return response.data;
  },
  toggleWishlist: async (carId) => {
    const response = await api.post(`/wishlist/toggle/${carId}`);
    return response.data;
  },
};
