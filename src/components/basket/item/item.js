import { connect } from 'react-redux';
import { decrement, increment, remove } from '../../../redux/actions';

const Item = ({
  productName,
  productId,
  amount,
  price,
  increment,
  decrement,
  remove,
}) => {
  return (
    <div>
      <p>
        {amount}
        {'x: '} {productName} {': '} {price * amount}
        {'$'}
      </p>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
      <button onClick={remove}>Удалить</button>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  amount: state.order[props.productId] || 0,
});

const mapDispatchToProps = (dispatch, props) => ({
  increment: () => dispatch(increment(props.productId)),
  decrement: () => dispatch(decrement(props.productId)),
  remove: () => dispatch(remove(props.productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);
