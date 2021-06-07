import { ADD_USER_AND_REVIEW, ADD_USER, ADD_REVIEW } from '../constants';
import { v4 as uuidv4 } from 'uuid';
import { addUser, addReview, addReviewToRestaurant } from "../actions";

export default (store) => (next) => (action) => {
  // console.log('before: ', store.getState());
  // console.log('action: ', action);

  if (action.type === ADD_USER_AND_REVIEW) {
    if (action.values['name'] && action.values['text']) {
      action.values['userId'] = uuidv4();
      action.values['reviewId'] = uuidv4();
      store.dispatch(addUser(action.values));
      store.dispatch(addReview(action.values));
      store.dispatch(addReviewToRestaurant(action.values));
    }
    return;
  }

  next(action);
  // console.log('after: ', store.getState());
};
