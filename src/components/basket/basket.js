import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './basket.module.css';
import Item from './item/item';



const Basket = ({ restaurants, order }) => {

  const orderedProducts = restaurants
    .reduce((acc, { menu }) => [...acc, ...menu], [])
    .filter(menu => order[menu.id]);

  return (
    <div>
      <h4 className={styles.header}>Basket content</h4>
      <ul className={styles.itemlist}>
        {orderedProducts.map(product => (<Item order={order} {...product} />))}
      </ul>
      <div>Total: {orderedProducts.reduce((acc, { id, price }) => acc + order[id] * price, 0)}</div>


      {/* <pre>
        {JSON.stringify({ order }, null, 2)}
      </pre> */}
    </div>
  );
}

const mapStateToProps = (state) => ({
  order: state.order,
});


export default connect(mapStateToProps)(Basket); 