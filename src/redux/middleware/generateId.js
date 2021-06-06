import { v4 as uuidv4 } from 'uuid';
import { ADD_REVIEW } from '../constants';

export default (store) => (next) => (action) => {
  if (action.type === ADD_REVIEW) {
    action.values = { ...action.values, userId: uuidv4(), id: uuidv4() };
  }

  next(action);
};
