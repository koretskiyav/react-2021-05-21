import { useEffect } from 'react';
import { connect } from 'react-redux';

import { loadProducts } from '../../redux/features/products';
import {
  productsLoadingSelector,
  shouldLoadProductsSelector,
} from '../../redux/features/products';

import Loader from '../loader';
import Product from '../product';
import Basket from '../basket';

import styles from './menu.module.css';

const Menu = ({ loadProducts, restaurantId, shouldLoad, menu, loading }) => {
  useEffect(() => {
    loadProducts(restaurantId);
  }, [shouldLoad, loadProducts, restaurantId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.menu}>
      <div>
        {menu.map((id) => (
          <Product key={id} id={id} />
        ))}
      </div>
      <div>
        <Basket />
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  loading: productsLoadingSelector(state, props),
  shouldLoad: shouldLoadProductsSelector(state, props),
});

const mapDispatchToProps = { loadProducts };

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
