import { CREATE_REVIEW } from '../constants';
import { v4 as uuid } from 'uuid';

export default (store) => (next) => (action) => {
  if (action.type === CREATE_REVIEW) {
    action.payload.reviewId = uuid();
    action.payload.userId = uuid();
  }

  next(action);
};
