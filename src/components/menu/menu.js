import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Product from '../product';
import Basket from '../basket';
import Loader from '../loader';
import { productsLoadingSelector, productsLoadedSelector } from '../../redux/selectors'
import { loadRestaurantProducts } from '../../redux/actions'

import styles from './menu.module.css';

class Menu extends Component {
  static propTypes = {
    menu: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  };

  state = { error: null };

  componentDidCatch(error) {
    this.setState({ error });
  }

  componentDidMount() {
    const { loading, loaded, loadRestaurantProducts, restaurantId } = this.props
    if (!loading || !loaded) loadRestaurantProducts(restaurantId);
  }

  render() {
    const { loading, loaded, menu } = this.props;

    if (this.state.error) {
      return <p>Сейчас меню этого ресторана недоступно :(</p>;
    }

    if (loading || !loaded) return <Loader />;

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

export default connect(state => ({
  loading: productsLoadingSelector(state),
  loaded: productsLoadedSelector(state),
}), { loadRestaurantProducts })(Menu);
