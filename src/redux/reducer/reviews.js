import {normalizedReviews} from '../../fixtures';
import {ADD_REVIEW} from "../constants";

const defaultReviews = normalizedReviews.reduce(
    (acc, review) => ({ ...acc, [review.id]: review }),
    {}
);

export default (reviews = defaultReviews, action) => {
  const {type, values} = action;

  switch (type) {
    case ADD_REVIEW:
      return {...reviews, [values.reviewId]: {
          id: values.reviewId,
          userId: values.userId,
          text: values.text,
          rating: values.rating,
        }};
    default:
      return reviews;
  }
};
