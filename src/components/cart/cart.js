import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { decrement, increment, remove } from '../../redux/actions';

import style from './cart.module.css';

const Cart = ({ products, restaurants, decrement, increment, remove }) => {
  const productsEmpty = typeof products === 'number' || Object.values(products).every((p) => p === 0);
  const menus = [];
  restaurants.forEach(({ menu }) => menus.push(...menu));
  const productsArr = Object.entries(products);

  const getProductInfo = (id) => menus.find((item) => item.id === id);

  const totalPrice = productsArr.reduce((acc, [id, count]) => {
    const { price } = getProductInfo(id);
    return acc += count * price;
  }, 0);

  const productsView = productsArr.map(([id, count]) => {
    if (!count) {
      return null;
    }

    const { name, price } = getProductInfo(id);

    return (
      <div className={style['cart-item']} key={id}>
        <div>{ name }</div>
        <div>
          <button onClick={() => decrement(id)}>-</button>
          { count }
          <button onClick={() => increment(id)}>+</button>
          <button onClick={() => remove(id)}>X</button>
        </div>
        <div>{ count * price }</div>
      </div>
    );
  });

  return (
    <section>
      <h4>Корзина</h4>
      <div className={style.cart}>
        { productsEmpty ? 'Корзина пуста' : productsView }
      </div>
      <div>Total: { totalPrice }</div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  products: state.order,
});

const mapDispatchToProps = {
  increment,
  decrement,
  remove,
};

Cart.propTypes = {
  products: PropTypes.oneOfType([
    PropTypes.shape({
      id: PropTypes.string,
    }),
    PropTypes.number,
  ]).isRequired,
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      menu: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      }).isRequired).isRequired,
    }).isRequired
  ).isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
