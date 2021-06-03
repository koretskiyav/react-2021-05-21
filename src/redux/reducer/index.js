import { combineReducers } from 'redux';
import orderReducer from './order';
import modeReducer from './mode';

export default combineReducers({
  order: orderReducer,
  mode: modeReducer,
  foo: () => 'bar',
});
