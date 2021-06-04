import React from 'react';
import { connect } from 'react-redux';
import BasketItem from './basketitem';

const Basket = (props) => {
  /// Здесь бы хотелось избавиться от totalPrice переменной, выглядит это не очень
  let totalPrice = 0;
  const listItems = Object.entries(props.basketData).map((item) => {
    totalPrice += item[1].price * item[1].amount;
    return (
      <BasketItem
        key={item[0]}
        id={item[0]}
        name={item[1].name}
        price={item[1].price}
        amount={item[1].amount}
      />
    );
  });
  const isPriceExist =
    totalPrice > 0 ? <div>Total price:{totalPrice}</div> : null;

  return (
    <React.Fragment>
      {listItems}
      {isPriceExist}
    </React.Fragment>
  );
};

/// Как оптимизировать?
/// При увеличении товаров в корзине все товары обновляются
const mapStateToProps = (state) => ({
  basketData: state.order,
});

export default connect(mapStateToProps)(Basket);
