import { Fragment } from 'react';
import { connect } from 'react-redux';
import styles from './backet.module.css';
import BacketItem from './backetitem';

function getBacketItems(order, findProductInfoById) {
  return !order
    ? []
    : Object.keys(order)
        .filter((key) => order[key] > 0)
        .map((key) => {
          const product = findProductInfoById(key);

          return {
            productId: key,
            productName: product.name,
            restaurantName: product.restaurantName,
            productPrice: product.price,
            itemCost: product.price * order[key],
            productAmount: order[key],
          };
        });
}

const Backet = ({ order, findProductInfoById }) => {
  // TODO: useMemo(.., [order])
  // TODO: pass via props
  // HOC?
  const backetItems = getBacketItems(order, findProductInfoById);

  // TODO: useMemo(.., [order])
  // TODO: pass via props
  // HOC?
  const backetTotal = backetItems.reduce((acc, item) => acc + item.productAmount * item.productPrice, 0);

  return (
    <div className={styles.backet}>
      <div>
        Ваша корзина:
        <span className={styles.content}>
          {!backetItems || backetItems.length === 0 ? (
            <span key="empty">нет товаров</span>
          ) : (
            <Fragment>
              {backetItems.map(
                (item) =>
                  item && (
                    <span key={item.productId} className={styles.backetItem}>
                      <BacketItem {...item}></BacketItem>
                    </span>
                  )
              )}
              (<span className={styles.total}>Общая стоимость:</span>${backetTotal})
            </Fragment>
          )}
        </span>
      </div>
    </div>
  );
};

//TODO: Backet.propTypes = {};

const mapStateToProps = (state) => ({
  order: state.order, // TODO
});

export default connect(mapStateToProps)(Backet);
