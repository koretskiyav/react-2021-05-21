import { DECREMENT, INCREMENT, REMOVE_PRODUCT } from '../constants';

const initialState = { basket: [], total: 0 };

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
              ? ((el.count += 1), (el.localPrice += price))
              : el;
          }),
          ...state,
          total: state.total + price,
        };
      } else {
        return {
          ...state,
          basket: [
            ...state.basket,
            { id: id, name: name, count: 1, price: price, localPrice: price },
          ],
          total: state.total + price,
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
            ? ((el.count -= 1), (el.localPrice -= price))
            : el;
        }),
        ...state,
        total: state.total > 0 ? state.total - price : state.total,
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        total: state.total - state.basket.find((el) => el.id === id).price,
        basket: [...state.basket.filter((el) => el.id !== id)],
      };

    default:
      return state;
  }
};
