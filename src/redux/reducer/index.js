import { combineReducers } from 'redux';
import order from '../features/order';
import restaurants from './restaurants';
import products from './products';
import reviews from '../features/reviews';
import users from './users';

export default combineReducers({
  order,
  restaurants,
  products,
  reviews,
  users,
});
