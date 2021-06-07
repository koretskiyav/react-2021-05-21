import { v4 as uuidv4 } from 'uuid';
import { REVIEW_FORM_SUBMIT } from '../constants';
import { reviewFormSubmitId } from '../actions';

export default (store) => (next) => (action) => {
  const { type, newReview } = action;

  if (type === REVIEW_FORM_SUBMIT) {
    const newReviewId = uuidv4();
    const newUserId = uuidv4();

    store.dispatch(
      reviewFormSubmitId({ ...newReview, newReviewId, newUserId })
    );
  }

  next(action);
};
