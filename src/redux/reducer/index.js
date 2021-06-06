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

function updateUsers_createUser(state, name) {
  debugger;
  state.users = { ...state.users };
  const id = String(Object.keys(state.reviews).length + 1000); // TODO: change to uuid 
  state.users[id] = { name, id };
  return id;
}

function updateReviews_createReview(state, reviewData) {
  const userId = updateUsers_createUser(state, reviewData.name);
  state.reviews = { ...state.reviews };
  const id = String(Object.keys(state.reviews).length + 1000); // TODO: change to uuid 
  state.reviews[id] = { ...reviewData, id, userId };
  return id;
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
      const reviewId = updateReviews_createReview(newState, action.reviewData);
      updateRestaurants_linkReviewToRestaurant(newState, reviewId, action.reviewData.restaurantId);
      return newState;
    default:
      return reducers(state, action);
  }
}
