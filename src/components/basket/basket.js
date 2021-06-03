import { Fragment, useMemo } from 'react';
import styles from './basket.module.css';
import { connect } from 'react-redux';
import BasketItem from './basketitem';
import PropTypes from 'prop-types';

const Basket = (props) => {
  const { restaurants, order } = props;

  const { orderList, totalPrice } = useMemo(() => {
    const orderList = [];
    let totalPrice = 0;

    restaurants.forEach((restaurant) => {
      restaurant.menu.forEach(({ id, name, price }) => {
        if (order.hasOwnProperty(id)) {
          orderList.push({ id, name, price, amount: order[id] });
          totalPrice += price * order[id];
        }
      });
    });

    return { orderList, totalPrice };
  }, [restaurants, order]);

  return (
    <div className={styles.basket}>
      <div className={styles.basketContainer}>
        <h1>Корзина</h1>
        <div className={styles.basketList}>
          {orderList.length === 0 ? (
            <p>Нет товаров</p>
          ) : (
            <Fragment>
              {orderList.map((product) => (
                <BasketItem key={product.id} {...product}></BasketItem>
              ))}
            </Fragment>
          )}
        </div>
        <div className={styles.basketTotalCost}>
          <p>Общая стоимость: </p>
          {totalPrice}
        </div>
      </div>
    </div>
  );
};

Basket.propTypes = {
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      restaurant: PropTypes.shape({
        menu: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
          }).isRequired
        ),
      }),
    })
  ).isRequired,
};

const mapStateToProps = (state) => ({
  order: state.order,
});

export default connect(mapStateToProps)(Basket);
