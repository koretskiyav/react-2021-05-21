import { Fragment } from 'react';
import styles from './backetitem.module.css';

const BacketItem = ({ productName, restaurantName, productAmount, itemCost }) => {
  return (
    <span className={styles.productOrder}>
      <span className={styles.productName}>{productName || 'Incorrect product info'}</span>
      {' from ' + (restaurantName || 'Incorrect restaurant info')}-{productAmount || 0}шт,$
      {itemCost || 0}
    </span>
  );
};

// TODO: BacketItem.propTypes = {};

export default BacketItem;
