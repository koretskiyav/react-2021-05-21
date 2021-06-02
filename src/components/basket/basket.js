import cn from 'classnames';
import { Component } from 'react';
import { connect } from 'react-redux';
import Product from '../product';
import { ReactComponent as BasketIcon } from '../../icons/basket.svg';
import { restaurants } from '../../fixtures';
import { remove } from '../../redux/actions';

import style from './basket.module.css';

const products = restaurants
  .map((restaurant) => restaurant.menu)
  .reduce((accum, menu) => [...accum, ...menu], []);

class Basket extends Component {
  state = {
    basketIsOpen: false,
  };

  openBasket = () => {
    this.setState({ basketIsOpen: true });
  };

  closeBasket = () => {
    this.setState({ basketIsOpen: false });
  };

  closePopup = (evt) => {
    if (evt.target.classList.contains('popupWrapper')) {
      this.closeBasket();
    }
  };

  getItemsProps(items = {}) {
    return Object.entries(items).map(([id, amount]) => {
      return {
        product: products.find((product) => id === product.id),
        amount,
      };
    });
  }

  render() {
    const basketItems = this.props.basket || {};
    const items = this.getItemsProps(basketItems);
    const { basketIsOpen } = this.state;

    const basketPopup = (
      <div
        className={cn(`popupWrapper`, style.popupWrapper)}
        onClick={this.closePopup}
      >
        <div className={style.popup}>
          <h3>Basket</h3>

          {Object.keys(basketItems).length > 0 ? (
            items.map(({ product, amount }) =>
              amount > 0 ? (
                <div key={product.id} className={style.basketItem}>
                  <Product product={product} />
                  <div
                    className={style.removeButton}
                    onClick={() => this.props.remove(product.id)}
                  >
                    &times;
                  </div>
                </div>
              ) : null
            )
          ) : (
            <p>Empty basket!</p>
          )}

          <div className={style.removeButton} onClick={this.closeBasket}>
            &times;
          </div>
        </div>
      </div>
    );

    return (
      <>
        <div className={style.basket}>
          <BasketIcon className={style.basketIcon} onClick={this.openBasket} />
        </div>
        {basketIsOpen ? basketPopup : null}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  basket: state.order,
});

const mapDispatchToProps = {
  remove,
};

export default connect(mapStateToProps, mapDispatchToProps)(Basket);
