import { connect } from 'react-redux';
import styles from './basket.module.css';
import { decrement, increment, remove } from '../../redux/actions';

function BasketDetail({ items, dispatch, state }) {
  console.log(state);

  const inc = (id) => {
    dispatch(increment(id));
  };

  const dec = (id) => {
    dispatch(decrement(id));
  };

  const removeItems = () => {
    dispatch(remove());
  };

  return (
    <div>
      <ul>
        Basket contains:
        {items.map((item) => (
          <li key={item.id} className={styles.basket}>
            Name - {item.productName}, amount - {item.amount}, total price -{' '}
            {item.totalPrice}
            <div>
              <span className={styles.inc} onClick={() => inc(item.id)}>
                +
              </span>
              <span className={styles.dec} onClick={() => dec(item.id)}>
                -
              </span>
            </div>
          </li>
        ))}
      </ul>

      <span className={styles.remove} onClick={() => removeItems()}>
        Remove
      </span>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    state,
  };
};

export default connect(mapStateToProps)(BasketDetail);
