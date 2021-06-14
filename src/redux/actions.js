import api from '../api';
import { LOAD_RESTAURANTS, LOAD_PRODUCTS } from './constants';

export const loadRestaurants = () => ({
  type: LOAD_RESTAURANTS,
  apiCall: () => api.loadRestaurants(),
});

export const loadProducts = (restaurantId) => ({
  type: LOAD_PRODUCTS,
  apiCall: () => api.loadProducts(restaurantId),
  restaurantId,
});
