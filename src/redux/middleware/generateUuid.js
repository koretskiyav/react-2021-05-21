import { ADD_REVIEW } from '../constants';
import { v5 as uuidv5 } from 'uuid';

const REVIEWS_NAMESPACE = 'e42ea751-2e13-438a-a0d6-c793a27880ff';

export default () => (next) => (action) => {
  if (action.type === ADD_REVIEW) {
    const { name, text } = action.values;

    action.values.id = uuidv5(text, REVIEWS_NAMESPACE);
    action.values.userId = uuidv5(name, REVIEWS_NAMESPACE);
  }

  next(action);
};
