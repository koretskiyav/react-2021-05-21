import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styles from './basket.module.css';
import BasketDetail from './basket-detail';

function Basket({ order, restaurant }) {
  const { menu } = restaurant;
  const [empty, setEmpty] = useState(true);

  useEffect(() => {
    if (order != 0) {
      setEmpty(false);
    }
  }, [order]);

  const reCalculateBasket = (order, menu) => {
    const result = Object.entries(order);
    const items = result.reduce((acc, current) => {
      const item = menu.filter((product) => {
        return product.id === current[0];
      });
      return [
        ...acc,
        {
          id: item[0].id,
          productName: item[0].name,
          amount: current[1],
          totalPrice: item[0].price * current[1],
        },
      ];
    }, []);

    return items;
  };

  return (
    <div className={styles.basket}>
      <p className={styles.head}>Basket</p>
      {empty ? (
        <p className={styles.message}> Basket is empty </p>
      ) : (
        <BasketDetail items={reCalculateBasket(order, menu)} />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    order: state.order,
  };
};

export default connect(mapStateToProps)(Basket);
