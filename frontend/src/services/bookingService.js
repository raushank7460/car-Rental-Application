import api from './api';

export const bookingService = {
  createBooking: async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },
  getMyBookings: async () => {
    const response = await api.get('/bookings');
    return response.data;
  },
  getBookingById: async (id) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },
  updateBookingStatus: async (id, data) => {
    const response = await api.put(`/bookings/${id}`, data);
    return response.data;
  },
  cancelBooking: async (id) => {
    const response = await api.put(`/bookings/${id}/cancel`);
    return response.data;
  },
};
