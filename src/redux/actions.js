import api from '../api';
import {
  LOAD_RESTAURANTS,
} from './constants';

export const loadRestaurants = () => ({
  type: LOAD_RESTAURANTS,
  apiCall: () => api.loadRestaurants(),
});

