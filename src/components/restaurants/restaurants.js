import { useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Restaurant from '../restaurant';
import Tabs from '../tabs';
import { activeRestaurantIdSelector, restaurantsSelector } from '../../redux/selectors';
import { setActiveRestaurantId } from '../../redux/actions';

const Restaurants = ({ activeId, restaurants, setActiveRestaurantId }) => {

  const activeRestaurant = useMemo(
    () => restaurants[activeId],
    [activeId, restaurants]
  );

  const tabs = Object.keys(restaurants).map(
    restaurantId => ({ id: restaurantId, title: restaurants[restaurantId].name })
  );

  return (
    <div>
      <Tabs tabs={tabs} activeId={activeId} onChange={setActiveRestaurantId} />
      <Restaurant restaurant={activeRestaurant} />
    </div>
  );
};

Restaurants.propTypes = {
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default connect((state) => ({
  activeId: activeRestaurantIdSelector(state),
  restaurants: restaurantsSelector(state),
}), (dispatch, props) => ({
  setActiveRestaurantId: (id) => dispatch(setActiveRestaurantId(id)),
}))(Restaurants);
