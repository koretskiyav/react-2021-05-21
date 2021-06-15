import { createAsyncThunk, createNextState } from '@reduxjs/toolkit';
import api from '../../api';

import { STATUS } from '../constants';
import { addReview } from '../features/reviews';
import { arrToMap, isLoaded, shouldLoad } from '../utils';

export const loadUsers = createAsyncThunk('users/load', () => api.loadUsers(), {
  condition: (_, { getState }) => shouldLoadUsersSelector(getState()),
});

const initialState = {
  status: STATUS.idle,
  entities: {},
  error: null,
};

export default createNextState((draft = initialState, action) => {
  const { type, payload, meta, error } = action;

  switch (type) {
    case loadUsers.pending.type: {
      draft.status = STATUS.pending;
      draft.error = null;
      break;
    }
    case loadUsers.fulfilled.type: {
      draft.status = STATUS.fulfilled;
      Object.assign(draft.entities, arrToMap(payload));
      break;
    }
    case loadUsers.rejected.type: {
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
const shouldLoadUsersSelector = shouldLoad(usersStatusSelector);
