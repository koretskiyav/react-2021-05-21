import PropTypes from 'prop-types';
import { Component } from 'react';
import styles from './basketItem.module.css';
import { connect } from 'react-redux';
import { ReactComponent as Minus } from '../../icons/minus.svg';
import { ReactComponent as Plus } from '../../icons/plus.svg';
import { ReactComponent as Cross } from '../../icons/cross.svg';
import { decrement, increment, remove } from '../../redux/actions';

class BasketItem extends Component {
  static propTypes = {
    product: PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.number,
      amount: PropTypes.number,
    }).isRequired,
    // from connect
    increment: PropTypes.func,
    decrement: PropTypes.func,
    remove: PropTypes.func,
  };

  render() {
    const { product, increment, decrement, remove } = this.props;

    return (
      <div className={styles.product}>
        <div className={styles.content}>
          <div>
            <h4 className={styles.title}>{product.name}</h4>
            <div className={styles.price}>
              {product.price * product.amount} $
            </div>
          </div>
          <div>
            <div className={styles.counter}>
              <div className={styles.count}>{product.amount}</div>
              <div className={styles.buttons}>
                <button className={styles.button} onClick={decrement}>
                  <Minus />
                </button>
                <button className={styles.button} onClick={increment}>
                  <Plus />
                </button>
                <button className={styles.button} onClick={remove}>
                  <Cross />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  amount: state.order[props.product.id] || 0,
});

const mapDispatchToProps = (dispatch, props) => ({
  increment: () => dispatch(increment(props.product.id)),
  decrement: () => dispatch(decrement(props.product.id)),
  remove: () => dispatch(remove(props.product.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BasketItem);
