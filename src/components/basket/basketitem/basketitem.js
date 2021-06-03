import styles from './basketitem.module.css';
import { ReactComponent as Minus } from '../../../icons/minus.svg';
import { ReactComponent as Plus } from '../../../icons/plus.svg';
import { connect } from 'react-redux';
import { decrement, increment, remove } from '../../../redux/actions';
import PropTypes from 'prop-types';

const BasketItem = ({ name, amount, price, increment, decrement, remove }) => {
  return (
    <div className={styles.basketItem}>
      <div className={styles.basketItemInformation}>
        <p>{name}</p>
        количество: {amount || 0}, стоимость: {price || 0}
      </div>
      <div className={styles.actions}>
        <button
          className={styles.action}
          onClick={decrement}
          data-id="product-decrement"
        >
          <Minus />
        </button>
        <button
          className={styles.action}
          onClick={increment}
          data-id="product-increment"
        >
          <Plus />
        </button>
        <button
          className={styles.action}
          onClick={remove}
          data-id="product-remove"
        >
          X
        </button>
      </div>
    </div>
  );
};

BasketItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch, props) => ({
  increment: () => dispatch(increment(props.id)),
  decrement: () => dispatch(decrement(props.id)),
  remove: () => dispatch(remove(props.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BasketItem);
