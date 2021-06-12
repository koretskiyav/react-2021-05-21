import api from '../api';
import {
  LOAD_USERS,
  REQUEST,
  SUCCESS,
  FAILURE,
} from './constants';

import { shouldLoadUsersSelector } from './selectors';

export const loadUsers = () => async (dispatch, getState) => {
  const shouldLoad = shouldLoadUsersSelector(getState());

  if (!shouldLoad) return;

  dispatch({ type: LOAD_USERS + REQUEST });

  try {
    const data = await api.loadUsers();
    dispatch({ type: LOAD_USERS + SUCCESS, data });
  } catch (error) {
    dispatch({ type: LOAD_USERS + FAILURE, error });
  }
};
