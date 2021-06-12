import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { isLoaded, shouldLoad } from '../utils';
import api from '../../api';
import { STATUS } from '../constants';
import { addReview } from './reviews';

export const usersSelector = (state) => state.users.entities;
export const usersStatusSelector = (state) => state.users.status;
export const usersLoadedSelector = isLoaded(usersStatusSelector);
export const shouldLoadUsersSelector = shouldLoad(usersStatusSelector);

export const loadUsers = createAsyncThunk(
  'users/load',
  () => api.loadUsers(),
  {
    condition: (arg, { getState }) => shouldLoadUsersSelector(getState()),
  }
);

const Users = createEntityAdapter();

const initialState = {
  ...Users.getInitialState(),
  status: STATUS.idle,
  error: null,
};

const { reducer } = createSlice({
  name: 'users',
  initialState: initialState,
  extraReducers: {
    [loadUsers.pending.type]: (state, { meta }) => {
      state.status = STATUS.pending;
      state.error = null;
    },
    [loadUsers.fulfilled.type]: (state, action) => {
      state.status = STATUS.fulfilled;
      Users.addMany(state, action);
    },
    [loadUsers.rejected.type]: (state, { meta, error }) => {
      state.status = STATUS.rejected;
      state.error = error;
    },
    [addReview.type]: (state, { meta, payload }) => {
      const { name } = payload.review;
      Users.addOne(state, { id: meta.userId, name });
    },
  }
});

export default reducer;

/*
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
*/