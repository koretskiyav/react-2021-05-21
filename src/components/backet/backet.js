import { connect } from 'react-redux';
import styles from './backet.module.css';

function getNonEmptyProductOrders(order, findProductById) {
  return !order
    ? []
    : Object.keys(order)
        .filter((key) => order[key] > 0)
        .map((key) => {
          const product = findProductById(key);

          return {
            productId: key,
            productName: product.name,
            productPrice: product.price,
            cost: product.price * order[key],
            amount: order[key],
          };
        });
}

const Backet = ({ order, findProductById }) => {
  // TODO: useMemo(.., [order])
  // TODO: pass via props
  // HOC?
  const nonEmptyProductOrders = getNonEmptyProductOrders(
    order,
    findProductById
  );

  // TODO: useMemo(.., [order])
  // TODO: pass via props
  // HOC?
  const backetTotal = nonEmptyProductOrders.reduce(
    (acc, item) => acc + item.amount * item.productPrice,
    0
  );

  return (
    <div className={styles.backet}>
      <div>
        Ваша корзина:
        <span className={styles.content}>
          {nonEmptyProductOrders.length === 0 ? (
            <span key="empty">нет товаров</span>
          ) : (
            <div>
              {nonEmptyProductOrders.map((productOrder) => (
                // TODO: extract to <ProductOrder>
                <span
                  key={productOrder.productId}
                  className={styles.productOrder}
                >
                  <span>
                    <span className={styles.productOrder_productName}>
                      {productOrder.productName}
                    </span>
                    -{productOrder.amount}шт,${productOrder.cost}
                  </span>
                </span>
              ))}
              (<span className={styles.total}>Общая стоимость:</span>$
              {backetTotal})
            </div>
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
