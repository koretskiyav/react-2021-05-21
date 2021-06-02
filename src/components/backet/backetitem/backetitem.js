import styles from './backetitem.module.css';
import { ReactComponent as Minus } from '../../../icons/minus.svg';
import { ReactComponent as Plus } from '../../../icons/plus.svg';
import { connect } from 'react-redux';
import { decrement, increment } from '../../../redux/actions';

const BacketItem = ({ productId, productName, restaurantName, productAmount, itemCost, increment, decrement }) => {
  console.log('BacketItem');

  // findProductInfoById(key) can be used here and create the 'getBacketItems' objects

  return (
    <span>
      <div>
        <span className={styles.productName}>{productName || 'Incorrect product info'}</span>
        {' from ' + (restaurantName || 'Incorrect restaurant info')} - {productAmount || 0}шт,$
        {itemCost || 0}
      </div>
      <span className={styles.buttons}>
        <button className={styles.button} onClick={decrement} data-id="product-decrement">
          <Minus />
        </button>
        <button className={styles.button} onClick={increment} data-id="product-increment">
          <Plus />
        </button>
      </span>
    </span>
  );
};

// TODO: BacketItem.propTypes = {};

const mapDispatchToProps = (dispatch, props) => {
  console.log('mapDispatchToProps');
  return {
    increment: () => {
      console.log('increment');
      dispatch(increment(props.productId));
    },
    decrement: () => dispatch(decrement(props.productId)),
  };
};

const mapStateToProps = (state, props) => {
  console.log('mapStateToProps');
  return {};
};

console.log('connect(mapStateToProps, mapDispatchToProps)(BacketItem)');
export default connect(mapStateToProps, mapDispatchToProps)(BacketItem);
