import { v4 as uuid } from 'uuid';

export default (store) => (next) => (action) => {
  const userId = uuid();
  const reviewId = uuid();

  next({ ...action, userId, reviewId });
};
