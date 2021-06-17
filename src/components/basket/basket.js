import { useContext, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import styles from './basket.module.css';
import itemStyles from './basket-item/basket-item.module.css';
import BasketItem from './basket-item';
import Button from '../button';
import { orderProductsSelector, totalSelector } from '../../redux/selectors';
import { payOrderAction, getPayOrderStatusSelector, getPayOrderFailureMessageSelector, PAY_STATUS } from '../../redux/features/order';
import { UserConsumer } from '../../contexts/user';
import moneyContext from '../../contexts/money';
import Loader from '../loader';

function Basket({ title = 'Basket', total, orderProducts, payOrder, payOrderStatus, payOrderError }) {
  const { m } = useContext(moneyContext);
  const location = useLocation();

  const [payOrderSuccessState, setPayOrderSuccessState] = useState(false);
  const [payOrderFailedState, setPayOrderFailedState] = useState(false);
  const [payOrderErrorState, setPayOrderErrorState] = useState("");

  if (payOrderSuccessState || (payOrderStatus === PAY_STATUS.success)) {
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

  console.log("payOrderFailedState " + payOrderFailedState);
  if (payOrderStatus === PAY_STATUS.failed || (payOrderFailedState === true)) {
    if (!payOrderFailedState) {
      setPayOrderFailedState(true);
      setPayOrderErrorState(payOrderError);
    }
    return (
      <Button primary block onClick={() => { setPayOrderFailedState(false); }}>
        Произошла ошибка: {payOrderErrorState}
      </Button>
    );
  }

  if (payOrderStatus === PAY_STATUS.started) {
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
    payOrderStatus: getPayOrderStatusSelector(state),
    payOrderError: getPayOrderFailureMessageSelector(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  payOrder: () => dispatch(payOrderAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Basket);
