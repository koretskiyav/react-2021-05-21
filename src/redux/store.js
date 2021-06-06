import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from './middleware/logger';
import userCreator from './middleware/userCreator';
import reviewCreator from './middleware/reviewCreator';
import reducer from './reducer';
import insertReviewIntoRestaurants from './middleware/insertReviewIntoRestaurants';

export default createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(
      logger,
      userCreator,
      reviewCreator,
      insertReviewIntoRestaurants
    )
  )
);
