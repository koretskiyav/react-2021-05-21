import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import middleware from './middleware';
import reducer from './reducer';

export default createStore(reducer, composeWithDevTools(middleware));
