import { combineReducers } from 'redux';
import order from './order';
import activeRestaurantId from './active-restaturant-id';
import restaurants from './restaurants';
import products from './products';
import reviews from './reviews';
import users from './users';

export default combineReducers({
  order,
  activeRestaurantId,
  restaurants,
  products,
  reviews,
  users,
});
