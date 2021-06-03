import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { decrement, increment, remove } from '../../../redux/actions';
import { ReactComponent as Minus } from '../../../icons/minus.svg';
import { ReactComponent as Plus } from '../../../icons/plus.svg';
import styles from './item.module.css'

const Item = ({ order, id, name, price, decrement, increment, remove }) => {
  return (
    <li className={styles.item} key={id}>
      <span className={styles['item-name']}>{name}:</span>
      <span className={styles['item-amount']}>x{order[id]}</span>
      <span className={styles['item-total']}>${price * order[id]}</span>
      <span className={styles['item-actions']}>
        <button
          className={styles.button}
          onClick={() => decrement(id)}
          data-id="product-decrement"
        >
          <Minus />
        </button>
        <button
          className={styles.button}
          onClick={() => increment(id)}
          data-id="product-increment"
        >
          <Plus />
        </button>
        <button
          className={styles.button, styles['remove-button']}
          onClick={() => remove(id)}
          data-id="product-increment"
        >
          X
        </button>
      </span>
    </li>
  );
}

Item.propTypes = {
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      menu: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired
        }).isRequired
      ).isRequired,
      price: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
  order: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch, props) => ({
  increment: () => dispatch(increment(props.id)),
  decrement: () => dispatch(decrement(props.id)),
  remove: () => dispatch(remove(props.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);