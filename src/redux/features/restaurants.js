import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import api from '../../api';

import { STATUS } from '../constants';
import { addReview } from './reviews';
import { isLoaded, shouldLoad } from '../utils';

const Restaurants = createEntityAdapter();

const initialState = {
  ...Restaurants.getInitialState(),
  status: STATUS.idle,
  error: null,
};

export const loadRestaurants = createAsyncThunk('restaurants/load', () =>
  api.loadRestaurants()
);

const { reducer } = createSlice({
  name: 'restaurants',
  initialState,
  extraReducers: {
    [loadRestaurants.pending.type]: (state) => {
      state.status = STATUS.pending;
      state.error = null;
    },
    [loadRestaurants.fulfilled.type]: (state, action) => {
      state.status = STATUS.fulfilled;
      Restaurants.addMany(state, action);
    },
    [loadRestaurants.rejected.type]: (state, { error }) => {
      state.status = STATUS.rejected;
      state.error = error;
    },
    [addReview.type]: (state, { payload, meta }) => {
      state.entities[payload.restaurantId].reviews.push(meta.reviewId);
    },
  },
});

export default reducer;

const restaurantsSelectors = Restaurants.getSelectors(
  (state) => state.restaurants
);
const restaurantsSelector = restaurantsSelectors.selectEntities;

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
  restaurantsSelectors.selectById(state, id);
