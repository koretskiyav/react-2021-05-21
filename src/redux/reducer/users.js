import { normalizedUsers } from '../../fixtures';
import { objectFromInitialData } from '../../utils/utils';
import { ADD_REVIEW } from '../constants';

const defaultUsers = objectFromInitialData(normalizedUsers);

export default (users = defaultUsers, action) => {
  const { type, values } = action;

  switch (type) {
    case ADD_REVIEW:
      const { userId, name } = values;
      return { ...users, [userId]: { userId, name } };
    default:
      return users;
  }
};
