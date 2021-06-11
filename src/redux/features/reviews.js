import produce from 'immer';
import api from '../../api';
import { FAILURE, REQUEST, STATUS, SUCCESS } from '../constants';
import { arrToMap, isLoaded, shouldLoad } from '../utils';

export const ADD_REVIEW = 'ADD_REVIEW';
export const LOAD_REVIEWS = 'LOAD_REVIEWS';

export const addReview = (review, restaurantId) => ({
  type: ADD_REVIEW,
  review,
  restaurantId,
  generateId: ['reviewId', 'userId'],
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

const initialState = {
  status: {},
  entities: {},
  error: null,
};

export default produce((draft = initialState, action) => {
  const { type, review, reviewId, userId, restaurantId, data, error } = action;

  switch (type) {
    case LOAD_REVIEWS + REQUEST: {
      draft.status[restaurantId] = STATUS.pending;
      draft.error = null;
      break;
    }
    case LOAD_REVIEWS + SUCCESS: {
      draft.status[restaurantId] = STATUS.fulfilled;
      Object.assign(draft.entities, arrToMap(data));
      break;
    }
    case LOAD_REVIEWS + FAILURE: {
      draft.status[restaurantId] = STATUS.rejected;
      draft.error = error;
      break;
    }
    case ADD_REVIEW:
      const { text, rating } = review;
      draft.entities[reviewId] = { id: reviewId, userId, text, rating };
      break;
    default:
      return draft;
  }
});

export const reviewsSelector = (state) => state.reviews.entities;
export const reviewsStatusSelector = (state, props) =>
  state.reviews.status[props.restaurantId];

export const reviewsLoadedSelector = isLoaded(reviewsStatusSelector);
export const shouldLoadReviewsSelector = shouldLoad(reviewsStatusSelector);

export const reviewSelector = (state, { id }) => reviewsSelector(state)[id];
