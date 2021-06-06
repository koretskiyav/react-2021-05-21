import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from './middleware/logger';
import reducer from './reducer';
import generateId from './middleware/generateId';

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(logger, generateId))
);
