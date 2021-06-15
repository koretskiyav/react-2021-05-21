import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import api from '../../api';
import { STATUS } from '../constants';
import { isLoaded, shouldLoad } from '../utils';
import { addReview } from './reviews';

export const LOAD_RESTAURANTS = 'LOAD_RESTAURANTS';

export const loadRestaurants = createAsyncThunk(
  'restaurants/load',
  () => api.loadRestaurants(),
  {
    condition: (id, { getState }) => shouldLoadRestaurantsSelector(getState()),
  }
);

const Restaurants = createEntityAdapter();

const initialState = {
  ...Restaurants.getInitialState(),
  status: {},
  error: null,
};
const { reducer } = createSlice({
  name: 'restaurants',
  initialState,
  extraReducers: {
    [loadRestaurants.pending.type]: (state, { meta }) => {
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
    [addReview.type]: (state, { meta, payload }) => {
      const { reviewId } = meta;
      const { restaurantId } = payload;
      state.entities[restaurantId].reviews.push(reviewId);
    },
  },
});

export default reducer;

const restaurantsSelectors = Restaurants.getSelectors(
  (state) => state.restaurants
);
export const restaurantsSelector = restaurantsSelectors.selectEntities;
export const restaurantsStatusSelector = (state) => state.restaurants.status;
export const restaurantsLoadedSelector = isLoaded(restaurantsStatusSelector);
export const shouldLoadRestaurantsSelector = shouldLoad(
  restaurantsStatusSelector
);
export const restaurantSelector = (state, restaurant) =>
  restaurantsSelector(state)[restaurant.id];
export const restaurantsListSelector = createSelector(
  restaurantsSelector,
  Object.values
);
