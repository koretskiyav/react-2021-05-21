import {normalizedUsers  } from '../../fixtures';
import { ADD_USER } from '../constants';

const defaultUsers = normalizedUsers.reduce(
  (acc, user) => ({ ...acc, [user.id]: user }),
  {}
);

export default (users = defaultUsers, action) => {
  const { type } = action;

  switch (type) {
    case ADD_USER:
      const newUser = {
        id: action.generatedId,
        name: action.name
      }
      return {...users, [action.generatedId]: {...newUser}}
    default:
      return users;
  }
};
