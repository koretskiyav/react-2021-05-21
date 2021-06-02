import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './product.module.css';
import { ReactComponent as Minus } from '../../icons/minus.svg';
import { ReactComponent as Plus } from '../../icons/plus.svg';
import { ReactComponent as Delete } from '../../icons/delete.svg';
import { decrement, increment, deleteProduct } from '../../redux/actions';

const Product = ({ product, amount, increment, decrement,  fetchData, sumPrice, deleteEnabled, deleteProduct }) => {
  useEffect(() => {
    fetchData && fetchData(product.id);
  }, []); // eslint-disable-line

  return (
    <div className={styles.product} data-id="product">
      <div className={styles.content}>
        <div>
          <h4 className={styles.title}>{product.name}</h4>
          <p className={styles.description}>{product.ingredients.join(', ')}</p>
          <div className={styles.price}>{product.price} $</div>
          {sumPrice &&  <div className={styles.price}>Cумма по продукту {sumPrice} $</div>}
        </div>
        <div>
          <div className={styles.counter}>
            <div className={styles.count} data-id="product-amount">
              {amount}
            </div>
            <div className={styles.buttons}>
              <button
                className={styles.button}
                onClick={decrement}
                data-id="product-decrement"
              >
                <Minus />
              </button>
              <button
                className={styles.button}
                onClick={increment}
                data-id="product-increment"
              >
                <Plus />
              </button>
              {
                deleteEnabled &&
                <button
                    className={styles.button}
                    onClick={deleteProduct}
                    data-id="product-delete"
                >
                  <Delete />
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    ingredients: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
  fetchData: PropTypes.func,
  // from connect
  amount: PropTypes.number,
  increment: PropTypes.func,
  decrement: PropTypes.func,
  deleteProduct: PropTypes.func,
  sumPrice: PropTypes.number,
  deleteEnabled: PropTypes.bool
};

const mapStateToProps = (state, props) => ({
  amount: state.order[props.product.id] || 0,
});

// const mapDispatchToProps = {
//   increment,
//   decrement,
// };

const mapDispatchToProps = (dispatch, props) => ({
  increment: () => dispatch(increment(props.product.id)),
  decrement: () => dispatch(decrement(props.product.id)),
  deleteProduct: () => dispatch(deleteProduct(props.product.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
