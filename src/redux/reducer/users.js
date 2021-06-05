import { normalizedUsers } from '../../fixtures';

const defaultUsers = normalizedUsers.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});

export default (users = defaultUsers, action) => {
  const { type } = action;

  switch (type) {
    default:
      return users;
  }
};
