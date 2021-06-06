import { INSERT_REVIEW_INTO_RESTAURANTS } from '../constants';

export default (store) => (next) => (action) => {
  if (action.type === INSERT_REVIEW_INTO_RESTAURANTS) {
    const reviewId = findReviewIdByNameAndReviewText(action, store);
    action.restaurant = getNewRestaurantObjectWithInsertedReview(
      action.restId,
      store,
      reviewId
    );
  }
  next(action);
};

const getNewRestaurantObjectWithInsertedReview = (restId, store, reviewId) => {
  const { restaurants } = store.getState();
  const newRest = restaurants[restId];
  newRest.reviews = [...newRest.reviews, reviewId];
  return newRest;
};

const findReviewIdByNameAndReviewText = (action, store) => {
  const { values } = action;
  const { reviews } = store.getState();
  const userId = getUserId(values.name, store);
  return Object.keys(reviews).filter((key) => {
    return reviews[key].text === values.text && reviews[key].userId === userId;
  })[0];
};

const getUserId = (userName, store) => {
  const { users } = store.getState();
  return Object.keys(users).filter((key) => users[key].name === userName)[0];
};
