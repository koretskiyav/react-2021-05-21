import api from '../api';
import {
  ADD_REVIEW,
  LOAD_RESTAURANTS,
  LOAD_PRODUCTS,
  LOAD_REVIEWS,
  LOAD_USERS,
  REQUEST,
  SUCCESS,
  FAILURE,
} from './constants';

import {
  shouldLoadReviewsSelector,
  shouldLoadUsersSelector,
} from './selectors';

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

export const loadProducts = (restaurantId) => ({
  type: LOAD_PRODUCTS,
  apiCall: () => api.loadProducts(restaurantId),
  restaurantId,
});

export const loadReviews = (restaurantId) => async (dispatch, getState) => {
  const shouldLoad = shouldLoadReviewsSelector(getState(), { restaurantId });

  if (!shouldLoad) return;
  dispatch({ type: LOAD_REVIEWS + REQUEST, restaurantId });

  try {
    const data = await api.loadReviews(restaurantId);
    dispatch({ type: LOAD_REVIEWS + SUCCESS, restaurantId, data });
  } catch (error) {
    dispatch({ type: LOAD_REVIEWS + FAILURE, restaurantId, error });
  }
};

export const loadUsers = () => async (dispatch, getState) => {
  const shouldLoad = shouldLoadUsersSelector(getState());

  if (!shouldLoad) return;

  dispatch({ type: LOAD_USERS + REQUEST });

  try {
    const data = await api.loadUsers();
    dispatch({ type: LOAD_USERS + SUCCESS, data });
  } catch (error) {
    dispatch({ type: LOAD_USERS + FAILURE, error });
  }
};
