import { Component } from 'react';
import PropTypes from 'prop-types';
import Product from '../product';
import Basket from '../basket';
import { loadProducts } from '../../redux/actions';
import { connect } from 'react-redux';
import styles from './menu.module.css';
import {restaurantProductsLoadedSelector, restaurantProductsLoadingSelector} from "../../redux/selectors";
import Loader from "../loader";


class Menu extends Component {
  static propTypes = {
    menu: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  };

  state = { error: null };

  componentDidMount() {
    const { loading, loaded, restaurantId, loadProducts } = this.props;

    if (!loading && !loaded) loadProducts(restaurantId);
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { menu, loading, loaded } = this.props;

    if (loading) return <Loader />;

    if (this.state.error || !loaded) {
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
  loading: restaurantProductsLoadingSelector(state, props),
  loaded: restaurantProductsLoadedSelector(state, props),
});

export default connect(mapStateToProps, { loadProducts })(Menu);
