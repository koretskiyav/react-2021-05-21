import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { restaurants } from '../../fixtures';

const Basket = (productsInBasket) => {
  const items = Object.keys(productsInBasket.productsInBasket);
  if (!items || !items.length) {
    return <></>;
  }


  const products = restaurants.map(r => [...r.menu]).flat(1);

  return <>
    <h1>Корзина</h1>
    {items.filter(x => productsInBasket.productsInBasket[x] > 0).map(i =>
      <div className='item' key={i}>
        <span>{`${products.find(x => x.id === i)?.name}: `}</span>
        <span>{productsInBasket.productsInBasket[i]}</span>
      </div>
    )}
  </>;
};

Basket.propTypes = {
  productsInBasket: PropTypes.shape({
    productsInBasket: PropTypes.shape({
      productName: PropTypes.string.isRequired,
      productCount: PropTypes.number.isRequired
    })
  })
};


const mapStateToProps = (state) => ({
  productsInBasket: state.order || {}
});

export default connect(mapStateToProps)(Basket);
