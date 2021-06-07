import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import newId from './middleware/new-id';
import reducer from './reducer';

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(newId))
);
