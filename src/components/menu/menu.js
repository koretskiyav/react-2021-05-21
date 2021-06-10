import { Component } from 'react';
import PropTypes from 'prop-types';
import Product from '../product';
import Basket from '../basket';

import styles from './menu.module.css';
import {
  productSelector, productsLoadedSelector,
  productsLoadingSelector,
  restaurantsLoadedSelector,
  restaurantsLoadingSelector
} from '../../redux/selectors';
import { connect } from 'react-redux';
import { loadProducts } from '../../redux/actions';
import Loader from '../loader';

class Menu extends Component {
  static propTypes = {
    menu: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  };

  state = { error: null };

  componentDidCatch(error) {
    this.setState({ error });
  }

  componentDidMount() {
    this.props.loadProducts(this.props.restaurantId);
  }

  render() {
    const { menu, loading, loaded } = this.props;

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

export default connect((state) => ({
  loading: productsLoadingSelector(state),
  loaded: productsLoadedSelector(state)

}), { loadProducts })(Menu);
