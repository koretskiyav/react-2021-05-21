import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../constants";
import api from "../../api";
import { isLoaded, shouldLoad } from "../utils";
import { addReview } from "./reviews";

// actions

export const loadRestaurants = createAsyncThunk(
  'restaurants/load',
  () => api.loadRestaurants()
);

// reducer

const Restaurants = createEntityAdapter();

const initialState = Restaurants.getInitialState({
  status: STATUS.idle,
  error: null,
});

const slice = createSlice({
  name: 'restaurants',
  initialState,
  extraReducers: {
    [loadRestaurants.pending]: (state) => {
      state.status = STATUS.pending;
      state.error = null;
    },
    [loadRestaurants.fulfilled]: (state, action) => {
      state.status = STATUS.fulfilled;
      Restaurants.addMany(state, action);
    },
    [loadRestaurants.rejected]: (state, { error }) => {
      state.status = STATUS.rejected;
      state.error = error;
    },
    [addReview.type]: (state, action) => {
      // TODO: move to 'AddRestaurantReview reducer'
      const reviews = state.entities[action.payload.restaurantId].reviews;
      Restaurants.updateOne(state, {
        id: action.payload.restaurantId,
        changes: {
          reviews: [...reviews, action.meta.reviewId]
        }
      });
    },
  }
});

export default slice.reducer;

// selectors 
const { selectAll, selectById } = Restaurants.getSelectors((state) => state[slice.name]);

const restaurantsStatusSelector = (state) => state.restaurants.status;

export const restaurantsLoadedSelector = isLoaded(restaurantsStatusSelector);
export const shouldLoadRestaurantsSelector = shouldLoad(
  restaurantsStatusSelector
);

export const restaurantsListSelector = selectAll;

export const restaurantSelector = (state, { id }) => selectById(state, id);
