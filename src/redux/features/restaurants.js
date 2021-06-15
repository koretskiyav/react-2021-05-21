import { createNextState, createSelector } from '@reduxjs/toolkit';
import api from '../../api';

import { STATUS, REQUEST, SUCCESS, FAILURE } from '../constants';
import { addReview } from '../features/reviews';
import { arrToMap, isLoaded, shouldLoad } from '../utils';

const LOAD_RESTAURANTS = 'LOAD_RESTAURANTS';

export const loadRestaurants = () => ({
  type: LOAD_RESTAURANTS,
  apiCall: () => api.loadRestaurants(),
});

const initialState = {
  status: STATUS.idle,
  entities: {},
  error: null,
};

export default (state = initialState, action) => {
  const { type, payload, meta, data, error } = action;

  switch (type) {
    case LOAD_RESTAURANTS + REQUEST:
      return { ...state, status: STATUS.pending, error: null };
    case LOAD_RESTAURANTS + SUCCESS:
      return { ...state, status: STATUS.fulfilled, entities: arrToMap(data) };
    case LOAD_RESTAURANTS + FAILURE:
      return { ...state, status: STATUS.rejected, error };
    case addReview.type:
      return createNextState(state, (draft) => {
        draft.entities[payload.restaurantId].reviews.push(meta.reviewId);
      });
    default:
      return state;
  }
};

const restaurantsSelector = (state) => state.restaurants.entities;
const restaurantsStatusSelector = (state) => state.restaurants.status;

export const restaurantsLoadedSelector = isLoaded(restaurantsStatusSelector);
export const shouldLoadRestaurantsSelector = shouldLoad(
  restaurantsStatusSelector
);

export const restaurantsListSelector = createSelector(
  restaurantsSelector,
  Object.values
);
export const restaurantSelector = (state, { id }) =>
  restaurantsSelector(state)[id];
