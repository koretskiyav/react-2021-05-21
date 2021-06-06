import { CREATE_NEW_REVIEW } from '../constants';
import { addReview, addUser, addReviewToRestaurant } from '../actions';
import { v4 as uuidv4 } from 'uuid';

export default (store) => (next) => (action) => {
  if (action.type === CREATE_NEW_REVIEW) {
    // add user
    const { name, rating, text } = action.rawReview;
    const userId = uuidv4();
    store.dispatch(addUser({ id: userId, name: name }));
    // add review
    const reviewId = uuidv4();
    store.dispatch(addReview({ id: reviewId, userId: userId, text: text, rating: rating }));
    // update list of reviews in active restaurant
    const state = store.getState();
    store.dispatch(addReviewToRestaurant({ restaurantId: state.activeRestaurantId, reviewId }));
  }

  next(action);
};
