import PropTypes from 'prop-types';
import Product from '../product';
import Basket from '../basket';
import { connect } from 'react-redux';
import styles from './menu.module.css';
import { loadProducts } from '../../redux/actions';
import { useEffect } from 'react';
import { productsLoadedSelector, productsLoadingSelector } from '../../redux/selectors';
import Loader from '../loader';

const Menu = ({ productsLoaded, productsLoading, loadProducts, menu }) => {
  useEffect(() => {
    if (!productsLoaded) {
      loadProducts();
    }
  }, [productsLoaded, loadProducts]);

  if (productsLoading || !productsLoaded) return <Loader />;

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

Menu.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

const mapStateToProps = (state, props) => ({
  productsLoaded: productsLoadedSelector(state, props),
  productsLoading: productsLoadingSelector(state)
});

const mapDispatchToProps = (dispatch, props) => ({
  loadProducts: () => dispatch(loadProducts(props.id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
