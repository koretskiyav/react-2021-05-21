import { normalizedUsers } from '../../fixtures';
import { ADD_REVIEW } from '../constants';

const defaultUsers = normalizedUsers.reduce(
  (acc, user) => ({ ...acc, [user.id]: user }),
  {}
);

export default (users = defaultUsers, action) => {
  const { type, review } = action;

  switch (type) {
    case ADD_REVIEW:
      const { userId, name } = review;
      return { ...users, [userId]: { id: userId, name } };
    default:
      return users;
  }
};
