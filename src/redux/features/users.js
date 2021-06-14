import { createNextState } from '@reduxjs/toolkit';
import api from '../../api';
import { STATUS, REQUEST, SUCCESS, FAILURE } from '../constants';
import { addReview } from '../features/reviews';
import { arrToMap, isLoaded, shouldLoad } from '../utils';
const LOAD_USERS = 'LOAD_USERS';

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

const initialState = {
  status: STATUS.idle,
  entities: {},
  error: null,
};

export default createNextState((draft = initialState, action) => {
  const { type, payload, meta, data, error } = action;

  switch (type) {
    case LOAD_USERS + REQUEST: {
      draft.status = STATUS.pending;
      draft.error = null;
      break;
    }
    case LOAD_USERS + SUCCESS: {
      draft.status = STATUS.fulfilled;
      Object.assign(draft.entities, arrToMap(data));
      break;
    }
    case LOAD_USERS + FAILURE: {
      draft.status = STATUS.rejected;
      draft.error = error;
      break;
    }
    case addReview.type:
      const { name } = payload.review;
      draft.entities[meta.userId] = { id: meta.userId, name };
      break;
    default:
      return draft;
  }
});

export const usersSelector = (state) => state.users.entities;

const usersStatusSelector = (state) => state.users.status;

export const usersLoadedSelector = isLoaded(usersStatusSelector);
export const shouldLoadUsersSelector = shouldLoad(usersStatusSelector);
