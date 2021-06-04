import React from 'react';
import { connect } from 'react-redux';
import { increment, decrement, removeAll } from '../../../redux/actions';
const BasketItem = ({
  name,
  price,
  amount,
  increment,
  decrement,
  clearAll,
}) => {
  return (
    <React.Fragment>
      <div>
        <span>{name} =></span>
        <span>{price}$ =></span>
        <span>{amount} items </span>
        <button onClick={decrement}>-</button>
        <button onClick={increment}>+</button>
        <button onClick={clearAll}>x</button>
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch, props) => ({
  increment: () => dispatch(increment(props.id, props.name, props.price)),
  decrement: () => dispatch(decrement(props.id, props.name, props.price)),
  clearAll: () => dispatch(removeAll(props.id)),
});

export default connect(null, mapDispatchToProps)(BasketItem);
