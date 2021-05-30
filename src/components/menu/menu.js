import PropTypes from 'prop-types';
import { Component } from 'react';
import Product from '../product';

import styles from './menu.module.css';

class Menu extends Component {
  static propTypes = {
    menu: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired, // for "key={product.id}"
      })
      // .isRequired - "filter((i) => i)" will skip null/undefined
    ),
    // menu.ArrayIsNotEmpty - empty array markup will confuse clients, support this value in markup
    // menu.isRequired - null/undefined can be handled as ArrayIsNotEmpty
  };

  state = { error: null };

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { menu } = this.props;

    if (this.state.error) {
      return <p>Меню этого ресторана сейчас недоступно :(</p>;
    }

    return (
      <div className={styles.menu}>
        <div>
          {!menu || !menu.length
            ? 'Menu is not available'
            : menu
                .filter((i) => i)
                .map((product) => (
                  <Product key={product.id} product={product} />
                ))}
        </div>
      </div>
    );
  }
}

// Menu.propTypes = {
//   menu: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//     }).isRequired
//   ).isRequired,
// };

export default Menu;
