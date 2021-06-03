import { Component  } from 'react';
import { connect } from 'react-redux';
import styles from './basket.module.css';
import { restaurants } from '../../fixtures';
import BasketItem from './basketItem';


class Basket extends Component  {
  render() {
    const menus = restaurants.map((restaurant) => restaurant.menu).flat();
    const { order } = this.props;

    const products = Object.keys(order).map((productId) => {
      const product = menus.find((product) => product.id === productId);
      return {
        id: productId,
        name: product.name,
        price: product.price,
        amount: order[productId],
      };
    });


    const totalPrice = products.reduce(
        (acc, product) => acc + product.amount * product.price,
        0
    );

    return (
        <div>
          {products.map((product) => (
              <BasketItem key={product.id} product={product} />
          ))}
          <div className={styles.product}>
            <div className={styles.content}>
              <h4 className={styles.title}>Total order price:</h4>
              <div className={styles.price}>{totalPrice} $</div>
            </div>
          </div>
        </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    order: state.order || [],
  };
};

export default connect(mapStateToProps)(Basket);