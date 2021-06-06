import { normalizedUsers } from '../../fixtures';

const defaultUsers = normalizedUsers.reduce(
  (acc, user) => ({ ...acc, [user.id]: product }),
  {}
);

export default (users = defaultUsers, action) => {
  const { type } = action;

  switch (type) {
    default:
      return users;
  }
};
