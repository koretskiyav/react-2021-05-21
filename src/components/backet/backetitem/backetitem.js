import styles from './backetitem.module.css';
import { ReactComponent as Minus } from '../../../icons/minus.svg';
import { ReactComponent as Plus } from '../../../icons/plus.svg';
import { connect } from 'react-redux';
import { decrement, increment, remove } from '../../../redux/actions';

const BacketItem = ({ productName, restaurantName, productAmount, itemCost, increment, decrement, remove }) => {
  return (
    <span>
      <div>
        <span className={styles.productName}>{productName}</span>
        {' from ' + restaurantName} - {productAmount || 0}шт,$
        {itemCost || 0}
      </div>
      <span className={styles.buttons}>
        <button className={styles.button} onClick={decrement} data-id="product-decrement">
          <Minus />
        </button>
        <button className={styles.button} onClick={increment} data-id="product-increment">
          <Plus />
        </button>
        <button className={styles.button} onClick={remove} data-id="product-increment">
          x
        </button>
      </span>
    </span>
  );
};

// TODO: BacketItem.propTypes = {};

const mapDispatchToProps = (dispatch, props) => ({
  increment: () => dispatch(increment(props.productId)),
  decrement: () => dispatch(decrement(props.productId)),
  remove: () => dispatch(remove(props.productId)),
});

const mapStateToProps = (state, props) => {
  // findProductInfoById(key) can be used here and create the 'getBacketItems' objects
  // See https://github.com/IgnatovDan/react-2021-05-21/blob/HT3_2021_06_01_ReadReduxFromBucketItem/src/components/backet/backetitem/backetitem.js
  // But findProductInfoById should be called in Backet component to calculate 'total' and I keep props
  console.log('mapStateToProps');
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BacketItem);
