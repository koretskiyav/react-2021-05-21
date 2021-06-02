import { decrement, increment } from '../../redux/actions';
import { connect, useSelector } from 'react-redux';
import { useMemo } from 'react';

const Basket = ({ restaurant, product, amount, increment, decrement }) => {
  const productCounter = useSelector((state) => state.order);
  console.log(productCounter);
  // const productList = useMemo(
  //   () =>
  //     productCounter.map((el, ind) => {
  //       return <div key={ind}>{el[ind]}</div>;
  //     }),
  //   [productCounter]
  // );

  return (
    <div>
      {/* {productList} */}
      <button onClick={decrement}> - </button>
      {amount}
      <button onClick={increment}> + </button>
    </div>
  );
};
const mapStateToProps = (state, props) => ({
  amount: state.order[0] || 0,
});

const mapDispatchToProps = (dispatch, props) => ({
  increment: () => dispatch(increment(props.product.id)),
  decrement: () => dispatch(decrement(props.product.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Basket);
