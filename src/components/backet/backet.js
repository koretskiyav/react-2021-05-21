import { useMemo, useState } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import styles from './backet.module.css';
import BacketItem from './backetitem';
import { restaurants } from '../../fixtures';

function getBacketData(order) {
  console.log('getBacketData');
  const data = {};
  const productInfos = restaurants.findProductInfosById(Object.keys(order || {}).filter((key) => order[key] > 0));

  data.items = productInfos.map((productInfo) => {
    const amount = order[productInfo.id] || 0;

    return {
      productId: productInfo.id,
      productName: productInfo.name,
      restaurantName: productInfo.restaurantName,
      productPrice: productInfo.price,
      itemCost: productInfo.price * amount,
      productAmount: amount,
    };
  });

  data.totalCost = data.items.reduce((acc, item) => acc + item.itemCost, 0);

  return data;
}

const Backet = ({ order }) => {
  console.log('Backet');
  const [checkUseMemo, setCheckUseMemo] = useState(1);

  // TODO: expand properties and pass via props ?
  const data = useMemo(() => getBacketData(order), [order]);

  return (
    <div className={styles.backet}>
      <button onClick={() => setCheckUseMemo(checkUseMemo + 1)}>check useMemo</button>
      <div>
        Ваша корзина:
        <span>
          {data.length === 0 ? (
            <span key="empty">нет товаров</span>
          ) : (
            <Fragment>
              {data.items.map((item) => item && <BacketItem key={item.productId} {...item}></BacketItem>)}
              <span className={styles.total}>Общая стоимость: ${data.totalCost}</span>
            </Fragment>
          )}
        </span>
      </div>
    </div>
  );
};

//TODO: Backet.propTypes = {};

const mapStateToProps = (state) => ({
  order: state.order,
});

export default connect(mapStateToProps)(Backet);
