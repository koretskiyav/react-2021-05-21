import { normalizedUsers } from '../../fixtures';
import { ADDREVIEW } from '../constants';

const usersDefault = normalizedUsers.reduce(
  (acc, user) => ({
    ...acc,
    [user.id]: user,
  }),
  {}
);

export default (users = usersDefault, action) => {
  const { type, userId, name } = action;
  switch (type) {
    case ADDREVIEW:
      return {
        ...users,
        [userId]: { id: userId, name },
      };
    default:
      return users;
  }
};
