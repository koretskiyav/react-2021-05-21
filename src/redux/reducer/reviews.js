import { normalizedReviews } from '../../fixtures';
import { REVIEW_FORM_SUBMIT_ID } from '../constants';

const defaultReviews = normalizedReviews.reduce(
  (acc, review) => ({ ...acc, [review.id]: review }),
  {}
);

export default (reviews = defaultReviews, action) => {
  const { type, newReviewWithId } = action;

  switch (type) {
    case REVIEW_FORM_SUBMIT_ID: {
      const { newReviewId, newUserId, text, rating } = newReviewWithId;
      return {
        ...reviews,
        [newReviewId]: { id: newReviewId, userId: newUserId, text, rating },
      };
    }

    default:
      return reviews;
  }
};
