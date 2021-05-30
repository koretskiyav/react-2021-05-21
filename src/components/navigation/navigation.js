import PropTypes from 'prop-types';
import styles from './navigation.module.css';

const Navigation = ({ restaurants, onRestaurantClick }) => (
  <div className={styles.list}>
    {!restaurants || !restaurants.length
      ? 'No restaurants'
      : restaurants
          .filter((i) => i)
          .map(({ id, name }) => (
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
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // for key={id}
    })
  ),
  // restaurants.ArrayIsNotEmpty - empty array markup will confuse clients, support this value in markup
  // restaurants.isRequired - null/undefined can be handled as ArrayIsNotEmpty
  onRestaurantClick: PropTypes.func.isRequired, // for onRestaurantClick(id)
};

export default Navigation;
