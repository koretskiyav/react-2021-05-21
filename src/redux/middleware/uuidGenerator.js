import { v4 as uuidv4 } from 'uuid';

export default (store) => (next) => (action) => {
  action['userId'] = uuidv4();
  action['reviewId'] = uuidv4();
  return next(action);
};
