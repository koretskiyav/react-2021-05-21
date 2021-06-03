import { DECREMENT, INCREMENT, REMOVE_PRODUCT } from '../constants';

const initialState = { basket: [] };

// { [productId]: amount }
export default (state = initialState, action) => {
  const { type, id, name, price } = action;

  switch (type) {
    case INCREMENT:
      const indexOfExistProductBasketInc = state.basket.findIndex(
        (el) => el.id === id
      );

      const newBasketInc = [...state.basket];

      if (indexOfExistProductBasketInc > -1) {
        return {
          basket: newBasketInc.map((el, ind) => {
            return ind === indexOfExistProductBasketInc
              ? ((el.count += 1), (el.price += price))
              : el;
          }),
          ...state,
        };
      } else {
        return {
          ...state,
          basket: [
            ...state.basket,
            { id: id, name: name, count: 1, price: price },
          ],
        };
      }

    case DECREMENT:
      const indexOfExistProductBasketDec = state.basket.findIndex(
        (el) => el.id === id
      );
      const newBasketDec = [...state.basket];
      return {
        basket: newBasketDec.map((el, ind) => {
          return ind === indexOfExistProductBasketDec && el.count > 0
            ? ((el.count -= 1), (el.price -= price))
            : el;
        }),
        ...state,
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        basket: [...state.basket.filter((el) => el.id !== id)],
      };

    default:
      return state;
  }
};
