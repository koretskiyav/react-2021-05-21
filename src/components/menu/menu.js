import { Component } from 'react';
import PropTypes from 'prop-types';
import Product from '../product';
import Basket from '../basket';
import { connect } from 'react-redux';
import { loadProducts } from '../../redux/actions';
import {
  productsIsLoadingSelector,
  productsIsLoadedSelector,
} from '../../redux/selectors';
import Loader from '../loader';
import styles from './menu.module.css';

class Menu extends Component {
  static propTypes = {
    menu: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  };

  state = { error: null };

  componentDidMount() {
    const { restaurantId, loadProducts, isLoadingProducts, isLoadedProducts } =
      this.props;

    if (!isLoadingProducts && !isLoadedProducts) {
      loadProducts(restaurantId);
    }
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { menu, isLoadingProducts, isLoadedProducts } = this.props;

    if (this.state.error) {
      return <p>Сейчас меню этого ресторана недоступно :(</p>;
    }

    if (isLoadingProducts || !isLoadedProducts) {
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
  }
}

const mapStateToProps = (state, props) => ({
  isLoadingProducts: productsIsLoadingSelector(state, props),
  isLoadedProducts: productsIsLoadedSelector(state, props),
});

export default connect(mapStateToProps, { loadProducts })(Menu);
