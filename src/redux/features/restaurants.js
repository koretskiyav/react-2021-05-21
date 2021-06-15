import { createSelector, createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isLoaded, shouldLoad } from '../utils';
import { STATUS } from '../constants';
import api from '../../api';
import { addReview } from './reviews';

export const loadRestaurants = createAsyncThunk(
  'restaurants/load',
  () => api.loadRestaurants(),
);

const Restaurants = createEntityAdapter();

const initialState = {
  ...Restaurants.getInitialState(),
  status: STATUS.idle,
  error: null,
};

const { reducer } = createSlice({
  name: 'restaurants',
  initialState: initialState,
  extraReducers: {
    [loadRestaurants.pending.type]: (state, action) => {
      state.status = STATUS.pending;
      state.error = null;
    },
    [loadRestaurants.fulfilled.type]: (state, action) => {
      state.status = STATUS.fulfilled;
      Restaurants.addMany(state, action);
    },
    [loadRestaurants.rejected.type]: (state, { meta, error }) => {
      state.status = STATUS.rejected;
      state.error = error;
    },
    [addReview.type]: (state, { payload, meta }) => {
      Restaurants.updateOne(state, {
        id: payload.restaurantId,
        changes: {
          reviews: [...state.entities[payload.restaurantId].reviews, meta.reviewId]
        },
      })
    },
  },
});

export default reducer;

const restaurantsSelectors = Restaurants.getSelectors((state) => state.restaurants);
export const restaurantsSelector = restaurantsSelectors.selectEntities;
export const restaurantsStatusSelector = (state) => state.restaurants.status;
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