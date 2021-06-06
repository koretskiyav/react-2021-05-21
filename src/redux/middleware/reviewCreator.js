import { v4 as uuidv4 } from 'uuid';
import { CREATE_REVIEW } from '../constants';

export default (store) => (next) => (action) => {
  if (action.type === CREATE_REVIEW) {
    action.review = createReviewObject(action, store);
  }

  next(action);
};

const createReviewObject = (action, store) => {
  const id = uuidv4();

  const newReview = {
    id,
    userId: getUserId(action.review.name, store),
    text: action.review.text,
    rating: action.review.rating,
  };
  return newReview;
};

const getUserId = (userName, store) => {
  const { users } = store.getState();
  return Object.keys(users).filter((key) => users[key].name === userName)[0];
};
