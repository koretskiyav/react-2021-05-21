import { useContext, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import styles from './basket.module.css';
import itemStyles from './basket-item/basket-item.module.css';
import BasketItem from './basket-item';
import Button from '../button';
import { orderProductsSelector, totalSelector } from '../../redux/selectors';
import { payOrderAction, isPayOrderStartedSelector, isPayOrderSuccessSelector, isPayOrderFailedSelector } from '../../redux/features/order';
import { UserConsumer } from '../../contexts/user';
import moneyContext from '../../contexts/money';
import Loader from '../loader';

function Basket({ title = 'Basket', total, orderProducts, payOrder, isPayOrderStarted, isPayOrderSuccess, isPayOrderFailed }) {
  const { m } = useContext(moneyContext);
  const location = useLocation();

  const [payOrderSuccessState, setPayOrderSuccessState] = useState(false);

  if (payOrderSuccessState || isPayOrderSuccess) {
    if (!payOrderSuccessState) {
      setPayOrderSuccessState(true);
      // clearOrder(); - incorrect at UI level, should be started immediately after 'ok' is received
    }

    return <Link to="/">
      <Button primary block>
        Оплата успешно завершена
      </Button>
    </Link>;
  }

  if (isPayOrderFailed) {
    return <Link to="/">
      <Button primary block>
        Оплата успешно завершена
      </Button>
    </Link>;
  }

  if (isPayOrderStarted) {
    return <Loader />
  }

  if (!total) {
    return (
      <div className={styles.basket}>
        <h4 className={styles.title}>Select a meal from the list</h4>
      </div>
    );
  }

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
      {
        (location.pathname === "/checkout") ?
          (
            <Button primary block onClick={payOrder}>
              Purchase
            </Button>
          )
          :
          (
            <Link to="/checkout">
              <Button primary block>
                checkout
              </Button>
            </Link>
          )
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    total: totalSelector(state),
    orderProducts: orderProductsSelector(state),
    isPayOrderStarted: isPayOrderStartedSelector(state),
    isPayOrderSuccess: isPayOrderSuccessSelector(state),
    isPayOrderFailed: isPayOrderFailedSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  payOrder: () => dispatch(payOrderAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Basket);
