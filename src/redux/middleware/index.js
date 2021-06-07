import { applyMiddleware } from 'redux';

import logger from './logger';
import productReview from './product-review';

export default applyMiddleware({ logger, productReview });
