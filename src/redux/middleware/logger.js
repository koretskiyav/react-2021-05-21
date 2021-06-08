import { v4 as uuidv4 } from 'uuid';
import { ADDREVIEW } from '../constants';

export default (store) => (next) => (action) => {
  // console.log('before: ', store.getState());
  ///console.log('action: ', action);
  ///console.log('mod: ', action);
  ///store.getState();
  if (action.type === ADDREVIEW) {
    action.reviewId = uuidv4();
    action.userId = uuidv4();
  }
  console.log('action: ', action);
  next(action);
  // console.log('after: ', store.getState());
};
