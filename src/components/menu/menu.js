import { Component } from 'react';
import PropTypes from 'prop-types';
import Product from '../product';
import Basket from '../basket';
import { loadProducts } from '../../redux/actions';

import styles from './menu.module.css';
import Loader from '../loader';
import { isLoadingProductsSelector } from '../../redux/selectors';
import { connect } from 'react-redux';

class Menu extends Component {
  static propTypes = {
    menu: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  };

  state = { error: null };

  componentDidCatch(error) {
    this.setState({ error });
  }

  componentDidMount() {
    this.props.loadProducts && this.props.loadProducts(); // TODO: unmount + mount or new Menu will send dublicated request
  }

  render() {
    const { menu } = this.props;

    if (this.state.error) {
      return <p>Сейчас меню этого ресторана недоступно :(</p>;
    }

    if (this.props.isLoading) {
      return (<Loader />);
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

const mapStateToProps = (state) => ({
  isLoading: isLoadingProductsSelector(state)
});

export default connect(mapStateToProps, { loadProducts })(Menu);

