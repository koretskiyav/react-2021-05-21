import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadProducts, productsLoadingSelector, shouldLoadProductsSelector } from '../../redux/features/products';

import Loader from '../loader';
import Product from '../product';
import Basket from '../basket';

import styles from './menu.module.css';

class Menu extends Component {
  static propTypes = {
    menu: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  };

  state = { error: null };

  componentDidMount() {
    this.props.loadProducts();
  }

  componentDidUpdate() {
    this.props.loadProducts();
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { menu, loading } = this.props;

    if (loading) {
      return <Loader />;
    }

    if (this.state.error) {
      return <p>Сейчас меню этого ресторана недоступно :(</p>;
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
  loading: productsLoadingSelector(state, props),
  shouldLoad: shouldLoadProductsSelector(state, props),
});

//const mapDispatchToProps = { loadProducts };
const mapDispatchToProps = (dispatch, ownProps) => ({
  loadProducts: () => dispatch(loadProducts(ownProps.restaurantId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
