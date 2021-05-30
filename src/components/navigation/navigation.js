import styles from './navigation.module.css';
import PropTypes from "prop-types";

const Navigation = ({ restaurants, onRestaurantClick }) => (
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
  </div>
);

Navigation.propTypes = {
    onRestaurantClick: PropTypes.func.isRequired,
    restaurants: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.number.isRequired,
    }).isRequired,)
}

export default Navigation;
