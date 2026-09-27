import api from './api';

export const carService = {
  getCars: async (params = {}) => {
    const response = await api.get('/cars', { params });
    return response.data;
  },
  getFeaturedCars: async () => {
    const response = await api.get('/cars/featured');
    return response.data;
  },
  getCarById: async (id) => {
    const response = await api.get(`/cars/${id}`);
    return response.data;
  },
  checkAvailability: async (id, pickupDate, returnDate) => {
    const response = await api.post(`/cars/${id}/availability`, { pickupDate, returnDate });
    return response.data;
  },
  createCar: async (carData) => {
    const response = await api.post('/cars', carData);
    return response.data;
  },
  updateCar: async (id, carData) => {
    const response = await api.put(`/cars/${id}`, carData);
    return response.data;
  },
  deleteCar: async (id) => {
    const response = await api.delete(`/cars/${id}`);
    return response.data;
  },
};
