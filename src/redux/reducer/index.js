import { combineReducers } from 'redux';
import order from './order';
import restaurants from './restaurants';
import products from './products';
import reviews from './reviews';
import users from './users';
import { CREATE_PRODUCT_REVIEW } from '../constants';

const reducers = combineReducers({
  order,
  restaurants,
  products,
  reviews,
  users,
});

function updateUsers_createUser(state, name, userId) {
  state.users = { ...state.users };
  //state.users[userId] = { name: (name !== '' && name !== null) ? name : undefined, userId };
  state.users[userId] = { name, userId };
}

function updateReviews_createReview(state, reviewData, reviewId, userId) {
  updateUsers_createUser(state, reviewData.name, userId);
  state.reviews = { ...state.reviews };
  state.reviews[reviewId] = { ...reviewData, id: reviewId, userId };
}

function updateRestaurants_linkReviewToRestaurant(state, reviewId, restaurantId) {
  state.restaurants = { ...state.restaurants };
  state.restaurants[restaurantId] = { ...state.restaurants[restaurantId] };
  state.restaurants[restaurantId].reviews = state.restaurants[restaurantId].reviews.slice();
  state.restaurants[restaurantId].reviews.push(reviewId);
}


export default (state, action) => {
  const { type } = action;

  switch (type) {
    case CREATE_PRODUCT_REVIEW:
      // https://redux.js.org/recipes/structuring-reducers/beyond-combinereducers#sharing-data-between-slice-reducers
      const newState = { ...state };
      updateReviews_createReview(newState, action.reviewData, action.reviewId, action.userId);
      updateRestaurants_linkReviewToRestaurant(newState, action.reviewId, action.reviewData.restaurantId);
      return newState;
    default:
      return reducers(state, action);
  }
}
