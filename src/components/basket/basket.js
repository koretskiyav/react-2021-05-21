import PropTypes from 'prop-types';
import { restaurants } from '../../fixtures';
import { connect } from 'react-redux';
import styles from './basket.module.css';

const Basket = ({ order }) => {
  const allProducts = restaurants.map((restaurant) => restaurant.menu).flat();

  const products = Object.keys(order)
    .filter((productId) => order[productId] > 0)
    .map((productId) =>
      allProducts.find((product) => product.id === productId)
    );

  return (
    <div className={styles.basket}>
      <h3>Корзина</h3>
      {products.map((product) => {
        return (
          <div className={styles.basketItem} key={product.id}>
            <div>{product.name} </div>
            <div>Количество - {order[product.id]}</div>
            <div>Стоимость - {product.price * order[product.id]}$</div>
          </div>
        );
      })}
      <div>
        Всего:{' '}
        {products.reduce((acc, { id, price }) => acc + price * order[id], 0)}
      </div>
    </div>
  );
};

Basket.propTypes = {
  order: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  order: state.order,
});

export default connect(mapStateToProps)(Basket);
