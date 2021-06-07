import { normalizedUsers } from '../../fixtures';
import { ADD_REVIEW } from '../constants';

const defaultUsers = normalizedUsers.reduce(
  (acc, user) => ({ ...acc, [user.id]: user }),
  {}
);

export default (users = defaultUsers, action) => {
  const { type } = action;

  switch (type) {
    case ADD_REVIEW:
      const { name } = action.payload.review;
      return {
        ...users,
        [action.userId]: { id: action.userId, name },
      };

    default:
      return users;
  }
};
