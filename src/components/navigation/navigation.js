import PropTypes from 'prop-types';
import styles from './navigation.module.css';
;

const Navigation = ({ restaurants, onRestaurantClick, onBasketClick }) => (
  <div className={styles.list}>
    {restaurants.map(({ id, name }) => (
      <span
        key={id}
        className={styles.restaurant}
        onClick={() => onRestaurantClick(id)}
      >
        {name}
      </span>
    ))}
      <span  className={styles.basket}  onClick={onBasketClick}>Корзина</span>
  </div>
);

Navigation.propTypes = {
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onRestaurantClick: PropTypes.func.isRequired,
};

export default Navigation;
