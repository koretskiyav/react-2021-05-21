import { useContext } from 'react';
import { connect } from 'react-redux';
import { Link, Switch, Route } from 'react-router-dom';

import styles from './basket.module.css';
import itemStyles from './basket-item/basket-item.module.css';
import BasketItem from './basket-item';
import Button from '../button';
import { orderProductsSelector, totalSelector } from '../../redux/selectors';
import { UserConsumer } from '../../contexts/user';
import moneyContext from '../../contexts/money';
import { checkout, orderIsLoadingSelector } from '../../redux/features/order';
import Loader from '../loader';

function Basket({ title = 'Basket', total, orderProducts, checkout, loading }) {
  const { m } = useContext(moneyContext);

  const submitHandler = () => {
    checkout(orderProducts);
  };

  if (loading) {
    return (
      <div className={styles.basket}>
        <Loader />
      </div>
    );
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
      {orderProducts.map(({ product, amount, subtotal }) => (
        <BasketItem
          product={product}
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
      <Switch>
        <Route path="/checkout">
          <Button primary block onClick={submitHandler}>
            checkout
          </Button>
        </Route>
        <Route>
          <Link to="/checkout">
            <Button primary block>
              checkout
            </Button>
          </Link>
        </Route>
      </Switch>
    </div>
  );
}

const mapStateToProps = (state, props) => {
  return {
    total: totalSelector(state),
    orderProducts: orderProductsSelector(state),
    loading: orderIsLoadingSelector(state, props),
  };
};

export default connect(mapStateToProps, { checkout })(Basket);
