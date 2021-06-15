import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import logger from './middleware/logger';
import generateId from './middleware/generateId';

import reducer from '../redux/features';

const middleware = [generateId, logger];

export default configureStore({
  reducer,
  middleware: getDefaultMiddleware({
    serializableCheck: { ignoredActionPaths: ['apiCall'] },
  }).concat(middleware),
});
