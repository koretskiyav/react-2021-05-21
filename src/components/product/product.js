import { connect } from 'react-redux';
import PropTypes from 'prop-types';
<<<<<<< HEAD
import styles from './product.module.css';
=======
import styles from './product.module.css'; 

import { ReactComponent as Minus } from '../../icons/minus.svg';
import { ReactComponent as Plus } from '../../icons/plus.svg';
>>>>>>> origin/master

import Button from '../button';
import { Money } from '../../contexts/money';
import { amountSelector } from '../../redux/features/order';
import { productSelector } from '../../redux/features/products';

import { decrement, increment } from '../../redux/features/order';

const Product = ({ product, amount, increment, decrement }) => {
  if (!product) return null;

  return (
    <div className={styles.product} data-id="product">
      <div className={styles.content}>
        <div>
          <h4 className={styles.title}>{product.name}</h4>
          <p className={styles.description}>{product.ingredients.join(', ')}</p>
          <div className={styles.price}>
            <Money value={product.price} />
          </div>
        </div>
        <div>
          <div className={styles.counter}>
            <div className={styles.count} data-id="product-amount">
              {amount}
            </div>
            <div className={styles.buttons}>
<<<<<<< HEAD
              <Button onClick={decrement} icon="minus" />
              <Button onClick={increment} icon="plus" />
=======
              <button 
                className={styles.button} 
                onClick={decrement}
                data-id="product-decrement">
                <Minus />
              </button>
              <button
                className={styles.button}
                onClick={increment}
                data-id="product-increment"
              >
                <Plus />
              </button>
>>>>>>> origin/master
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
  }),
  // from connect
  amount: PropTypes.number,
  increment: PropTypes.func,
  decrement: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  amount: amountSelector(state, props),
  product: productSelector(state, props),
});

const mapDispatchToProps = (dispatch, props) => ({
  increment: () => dispatch(increment(props.id)),
  decrement: () => dispatch(decrement(props.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
