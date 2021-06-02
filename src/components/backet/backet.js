import { useMemo, useState } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import styles from './backet.module.css';
import BacketItem from './backetitem';
import { restaurants } from '../../fixtures';

const Backet = ({ order }) => {
  console.log('Backet');
  const [checkUseMemo, setCheckUseMemo] = useState(1);

  // TODO: move to mapStateToProps and pass 'data' via props ?
  const data = useMemo(
    () => restaurants.getBacketData(order),
    [order /* one and the same instance is passed at each render if it was not modified */]
  );

  return (
    <div className={styles.backet}>
      <button onClick={() => setCheckUseMemo(checkUseMemo + 1)}>check useMemo</button>
      <div>
        Ваша корзина:
        <span>
          {data.items.length === 0 ? (
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
