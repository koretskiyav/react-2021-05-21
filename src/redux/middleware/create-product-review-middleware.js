import { CREATE_PRODUCT_REVIEW } from '../constants';
import { v4 as uuid } from 'uuid';

export default (store) => (next) => (action) => {
  if(action.type === CREATE_PRODUCT_REVIEW) {
    // action.reviewData = { ... action.reviewData, reviewId: uuid(), userId: uuid() }; ???
    action.reviewId = uuid();
    action.userId = uuid();
  }
  next(action);
};
