import {
  createAsyncThunk,
  createNextState,
  createSelector,
} from '@reduxjs/toolkit';
import api from '../../api';

import { STATUS } from '../constants';
import { addReview } from '../features/reviews';
import { arrToMap, isLoaded, shouldLoad } from '../utils';

export const loadRestaurants = createAsyncThunk(
  'restaurants/load',
  () => api.loadRestaurants(),
  { condition: (_, { getState }) => shouldLoadRestaurantsSelector(getState()) }
);

const initialState = {
  status: STATUS.idle,
  entities: {},
  error: null,
};

export default (state = initialState, action) => {
  const { type, payload, meta, error } = action;

  switch (type) {
    case loadRestaurants.pending.type:
      return { ...state, status: STATUS.pending, error: null };
    case loadRestaurants.fulfilled.type:
      return {
        ...state,
        status: STATUS.fulfilled,
        entities: arrToMap(payload),
      };
    case loadRestaurants.rejected.type:
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
const shouldLoadRestaurantsSelector = shouldLoad(restaurantsStatusSelector);

export const restaurantsListSelector = createSelector(
  restaurantsSelector,
  Object.values
);
export const restaurantSelector = (state, { id }) =>
  restaurantsSelector(state)[id];
