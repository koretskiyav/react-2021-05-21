import { useSelector } from 'react-redux';
import { useLayoutEffect, useMemo } from 'react';
import BasketProduct from './basketProduct/basketProduct';
import store from '../../redux/store';

const Basket = (props) => {
  const productCounter = useSelector((state) => state.order.basket);

  const productBasketSum = useSelector((state) => state.order.total);

  const productList =
    // debugger;
    productCounter.map((el, ind) => {
      return (
        <div key={ind}>
          <BasketProduct
            id={el.id}
            name={el.name}
            count={el.count}
            price={el.price}
            localPrice={el.localPrice}
          />
        </div>
      );
    });

  return (
    <div>
      <div>Global_price: {productBasketSum}</div>
      <div>{productList}</div>
    </div>
  );
};

// debugger;

export default Basket;
