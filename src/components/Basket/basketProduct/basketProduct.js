import { connect } from 'react-redux';
import { decrement, increment, removeProduct } from '../../../redux/actions';

const BasketProduct = ({
  id,
  name,
  count,
  price,
  increment,
  decrement,
  removeProduct,
}) => {
  return (
    <div>
      <div>
        {id}+++{name} <button onClick={decrement}>-</button>
        {count}
        <button onClick={increment}>+</button>
        {price}$<button onClick={removeProduct}>Х</button>
      </div>
    </div>
  );
};
// debugger;
const mapStateToProps = (state, props) => ({
  id: props.id,
  name: props.name,
  count: state.order.basket.find((el) => el.id === props.id)?.count,
  price: state.order.basket.find((el) => el.id === props.id)?.price,
});

const mapDispatchToProps = (dispatch, props) => ({
  increment: () => dispatch(increment(props.id, props.name, props.price)),
  decrement: () => dispatch(decrement(props.id, props.name, props.price)),
  removeProduct: () => dispatch(removeProduct(props.id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(BasketProduct);
