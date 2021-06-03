import { DECREMENT, INCREMENT, RESET } from './constants';

export const increment = (id) => ({ type: INCREMENT, id });
export const decrement = (id) => ({ type: DECREMENT, id });
export const reset = (id) => ({type: RESET, id })
