import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './product.module.css';
import { ReactComponent as Minus } from '../../icons/minus.svg';
import { ReactComponent as Plus } from '../../icons/plus.svg';
import { DataIds } from './product.dataids';

import counter from '../../hocs/counter';

const Product = ({ product, amount, increment, decrement, fetchData }) => {
  useEffect(() => {
    product && product.id && fetchData && fetchData(product.id);
  }, []); // eslint-disable-line

  return !product ? (
    <div data-id={DataIds.isNotAvailable}>'Product is not available'</div>
  ) : (
    <div className={styles.product} data-id={DataIds.product}>
      <div className={styles.content}>
        <div>
          <h4 className={styles.title}>{product.name}</h4>
          <p className={styles.description}>
            {!product.ingredients ? 'Ingredients are not available' : product.ingredients.join(', ')}
          </p>
          <div className={styles.price}>{product.price} $</div>
        </div>
        <div>
          <div className={styles.counter}>
            <div className={styles.count} data-id={DataIds.amount}>
              {amount}
            </div>
            <div className={styles.buttons}>
              <button className={styles.button} onClick={decrement} data-id={DataIds.decrement}>
                <Minus />
              </button>
              <button className={styles.button} onClick={increment} data-id={DataIds.increment}>
                <Plus />
              </button>
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
    ingredients: PropTypes.arrayOf(PropTypes.string.isRequired),
    // ingredients.isRequired - null/undefined handled in code
    // id: PropTypes.string.isRequired - TODO for "fetchData(product.id)"
  }),
  // restaurants.isRequired - null/undefined markup will confuse clients or lead to broken page, support this value in markup

  amount: PropTypes.number,
  increment: PropTypes.func,
  decrement: PropTypes.func,
  fetchData: PropTypes.func,
};

// Product.DataIds = DataIds; - will not be available in external modules: 'counter(Product)' is exported

export default counter(Product);
