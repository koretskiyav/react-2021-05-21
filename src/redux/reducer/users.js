import { normalizedUsers } from '../../fixtures';
import { POST_REVIEW } from '../constants';

const defaultUsers = normalizedUsers.reduce(
  (acc, user) => ({
    ...acc,
    [user.id]: user,
  }),
  {}
);

export default (users = defaultUsers, action) => {
  const { type, name, userId } = action;
  switch (type) {
    case POST_REVIEW:
      return {
        ...users,
        [userId]: { id: userId, name: name },
      };
    default:
      return users;
  }
};
