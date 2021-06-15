import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import logger from './middleware/logger';
import generateId from './middleware/generateId';

import order from './features/order';
import restaurants from './features/restaurants';
import products from './features/products';
import reviews from './features/reviews';
import users from './features/users';

const middleware = [generateId, logger];

export default configureStore({
  reducer: {
    order,
    restaurants,
    products,
    reviews,
    users,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: { ignoredActionPaths: ['apiCall'] },
  }).concat(middleware),
});
