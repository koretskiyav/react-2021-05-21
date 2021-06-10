import api from '../api';
import {
  DECREMENT,
  INCREMENT,
  REMOVE,
  ADD_REVIEW,
  LOAD_RESTAURANTS,
  LOAD_REVIEWS,
  REQUEST,
  SUCCESS,
  FAILURE,
  LOAD_PRODUCTS,
  LOAD_USERS
} from './constants';

export const increment = (id) => ({ type: INCREMENT, id });
export const decrement = (id) => ({ type: DECREMENT, id });
export const remove = (id) => ({ type: REMOVE, id });

export const addReview = (review, restaurantId) => ({
  type: ADD_REVIEW,
  review,
  restaurantId,
  generateId: ['reviewId', 'userId'],
});

export const loadRestaurants = () => ({
  type: LOAD_RESTAURANTS,
  apiCall: () => api.loadRestaurants(),
});

export const loadProducts = () => ({
  type: LOAD_PRODUCTS,
  apiCall: () => api.loadProducts(),
});

export const loadReviews = (restaurantId) => async (dispatch) => {
  dispatch({ type: LOAD_REVIEWS + REQUEST, restaurantId });

  try {
    const data = await api.loadReviews(/* TODO: restaurantId*/);
    dispatch({ type: LOAD_REVIEWS + SUCCESS, data });
  } catch (error) {
    dispatch({ type: LOAD_REVIEWS + FAILURE, error });
  }
};

export const loadUsers = () => async (dispatch) => {
  dispatch({ type: LOAD_USERS + REQUEST/* TODO: restaurantId*/ });

  try {
    const data = await api.loadUsers(/* TODO: restaurantId*/);
    dispatch({ type: LOAD_USERS + SUCCESS, data });
  } catch (error) {
    dispatch({ type: LOAD_USERS + FAILURE, error });
  }
};
