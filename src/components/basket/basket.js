import { connect } from 'react-redux';
import Order from '../order';
import {restaurants} from '../../fixtures';
import styles from './basket.module.css';

const Basket = ({productsIds}) => {
  
  const allProducts = restaurants
                        .map(s => [...s.menu]).flat(1)
                        .reduce((a,x) => ({...a, [x.id]: x}),{});

  const orderItems = productsIds.map(s => allProducts[s]);
  
  return (
    <div className={styles.basket}>
      <h1>Корзина</h1>
      <Order orderItems={orderItems} />
    </div>
  );
}
  
const mapStateToProps = (state) => ({
  productsIds: Object.keys(state.order).filter(key => state.order[key] > 0)
});

export default connect(mapStateToProps)(Basket);
