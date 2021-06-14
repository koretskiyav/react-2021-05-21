import {
  createAsyncThunk,
  createNextState,
  createSelector,
} from '@reduxjs/toolkit';
import api from '../../api';
import { STATUS } from '../constants';
import { addReview } from '../features/reviews';
import { arrToMap, isLoaded, shouldLoad } from '../utils';
import produce from 'immer';

export const loadRestaurants = createAsyncThunk(
  'restaurants/load',
  () => api.loadRestaurants(),
  {
    condition: (_, { getState }) => shouldLoadRestaurantsSelector(getState()),
  }
);

const initialState = {
  status: STATUS.idle,
  entities: {},
  error: null,
};

export default produce((draft = initialState, action) => {
  const { type, payload, meta, error } = action;

  switch (type) {
    case loadRestaurants.pending.type: {
      draft.status = STATUS.pending;
      draft.error = null;
      break;
    }
    case loadRestaurants.fulfilled.type: {
      draft.status = STATUS.fulfilled;
      draft.entities = arrToMap(payload);
      break;
    }
    case loadRestaurants.rejected.type: {
      draft.status = STATUS.rejected;
      draft.error = error;
      break;
    }
    case addReview.type:
      return createNextState(draft, (draft) => {
        draft.entities[payload.restaurantId].reviews.push(meta.reviewId);
      });
    default:
      return draft;
  }
});

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
