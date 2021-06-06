import { v4 as uuidv4 } from 'uuid';
import { CREATE_USER } from '../constants';

export default (store) => (next) => (action) => {
  if (
    action.type === CREATE_USER &&
    !isExist(action.user.name, store.getState().users)
  ) {
    action.user = createUserObject(action.user);
  }
  next(action);
};

const isExist = (userName, usersStore) => {
  return (
    Object.keys(usersStore).filter((key) => {
      return usersStore[key].name === userName;
    }).length > 0
  );
};

const createUserObject = (user) => {
  const id = uuidv4();
  const newUser = { id, name: user.name };
  return newUser;
};
