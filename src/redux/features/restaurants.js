import { createNextState, createSelector } from "@reduxjs/toolkit";
import { FAILURE, REQUEST, STATUS, SUCCESS } from "../constants";
import api from "../../api";
import { arrToMap, isLoaded, shouldLoad } from "../utils";
import { addReview } from "./reviews";

export const LOAD_RESTAURANTS = 'LOAD_RESTAURANTS';

// reducer

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

// actions

export const loadRestaurants = () => async (dispatch) => {
  dispatch({ type: LOAD_RESTAURANTS + REQUEST });
  try {
    const data = await api.loadRestaurants();
    dispatch({ type: LOAD_RESTAURANTS + SUCCESS, data });
  } catch (error) {
    dispatch({ type: LOAD_RESTAURANTS + FAILURE, error });
  }
}

// selectors 

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
