import { useContext, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './basket.module.css';
import itemStyles from './basket-item/basket-item.module.css';
import BasketItem from './basket-item';
import Button from '../button';
import {
  orderProductsSelector,
  pathNameSelector,
  totalSelector,
} from '../../redux/selectors';
import { UserConsumer } from '../../contexts/user';
import moneyContext from '../../contexts/money';
import { orderToArraySelector } from '../../redux/features/order';
import { sendOrder } from '../../redux/features/basket';

function Basket({
  title = 'Basket',
  total,
  orderProducts,
  order,
  pathName,
  sendOrder,
}) {
  const { m } = useContext(moneyContext);
  const [processing, setProcessing] = useState(false);

  if (!total) {
    return (
      <div className={styles.basket}>
        <h4 className={styles.title}>Select a meal from the list</h4>
      </div>
    );
  }

  const handleClick = () => {
    sendOrder(order);
    setProcessing(true);
  };

  return (
    <div className={styles.basket}>
      <h4 className={styles.title}>
        <UserConsumer>{({ name }) => `${name}'s ${title}`}</UserConsumer>
      </h4>
      {orderProducts.map(({ product, amount, subtotal, restaurantId }) => (
        <BasketItem
          product={product}
          restaurantId={restaurantId}
          amount={amount}
          key={product.id}
          subtotal={subtotal}
        />
      ))}
      <hr className={styles.hr} />
      <div className={itemStyles.basketItem}>
        <div className={itemStyles.name}>
          <p>Total</p>
        </div>
        <div className={itemStyles.info}>
          <p>{m(total)}</p>
        </div>
      </div>
      {pathName === '/checkout' ? (
        <Button
          primary
          block
          disabled={processing}
          onClick={!processing ? handleClick : null}
        >
          checkout
        </Button>
      ) : (
        <Link to="/checkout">
          <Button primary block>
            checkout
          </Button>
        </Link>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    total: totalSelector(state),
    orderProducts: orderProductsSelector(state),
    order: orderToArraySelector(state),
    pathName: pathNameSelector(state),
  };
};

const mapDispatchToProps = { sendOrder };

export default connect(mapStateToProps, mapDispatchToProps)(Basket);
