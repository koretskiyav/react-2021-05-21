import { createAsyncThunk, createEntityAdapter, createNextState, createSelector, createSlice } from "@reduxjs/toolkit";
import { FAILURE, REQUEST, STATUS, SUCCESS } from "../constants";
import api from "../../api";
import { arrToMap, isLoaded, shouldLoad } from "../utils";
import { addReview } from "./reviews";

export const LOAD_RESTAURANTS = 'LOAD_RESTAURANTS';

// actions

export const loadRestaurants = createAsyncThunk(
  'restaurants/load',
  async () => await api.loadRestaurants()
);

// reducer

const Restaurants = createEntityAdapter();

const initialState = Restaurants.getInitialState({
  status: STATUS.idle,
  error: null,
});

const { reducer } = createSlice({
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
      const reviews = state.entities[action.payload.restaurantId].reviews;
      Restaurants.updateOne(state, {
        id: action.payload.restaurantId, changes: {
          reviews: [...reviews, action.meta.reviewId]
        }
      });
    },
  }
});

export default reducer;

// selectors 
// TODO: Restaurants.getSelectors();

// selectEntities
const restaurantsSelector = (state) => state.restaurants.entities;
const restaurantsStatusSelector = (state) => state.restaurants.status;

export const restaurantsLoadedSelector = isLoaded(restaurantsStatusSelector);
export const shouldLoadRestaurantsSelector = shouldLoad(
  restaurantsStatusSelector
);

// TODO: selectAll
export const restaurantsListSelector = createSelector(
  restaurantsSelector,
  Object.values
);

// selectById
export const restaurantSelector = (state, { id }) =>
  restaurantsSelector(state)[id];
