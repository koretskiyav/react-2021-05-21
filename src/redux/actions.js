import { DECREMENT, INCREMENT, REMOVE_PRODUCT } from './constants';

export const increment = (id) => ({ type: INCREMENT, id });
export const decrement = (id) => ({ type: DECREMENT, id });
export const remove_product = (id) => ({ type: REMOVE_PRODUCT, id });
