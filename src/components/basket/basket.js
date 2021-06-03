import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './basket.module.css';
import Item from './item/item';
import { useMemo } from 'react';



const Basket = ({ restaurants, order }) => {

  const orderedProducts = useMemo(
    () => restaurants
      .reduce((acc, { menu }) => [...acc, ...menu], [])
      .filter(menu => order[menu.id]),
    [order]
  );

  return (
    <div>
      <h4 className={styles.header}>Basket content</h4>
      <ul className={styles.itemlist}>
        {orderedProducts.map(product => (<Item key={product.id} order={order} {...product} />))}
      </ul>
      <div>Total: {orderedProducts.reduce((acc, { id, price }) => acc + order[id] * price, 0)}</div>
    </div>
  );
}

Basket.propTypes = {
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      menu: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired
        }).isRequired
      ).isRequired,
      price: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
  order: PropTypes.object.isRequired
};


const mapStateToProps = (state) => ({
  order: state.order,
});


export default connect(mapStateToProps)(Basket); 