import { useState } from 'react';
import { connect } from 'react-redux';
import Restaurant from '../restaurant';
import Tabs from '../tabs';
import { restaurantSelector } from '../../redux/selectors';

const Restaurants = ({ restaurants }) => {
  const [activeId, setActiveId] = useState(Object.keys(restaurants)[0]);

  const activeRestaurant = restaurants[activeId];
  const tabs = Object.keys(restaurants).map((key) => ({
    id: key,
    title: restaurants[key].name,
  }));

  return (
    <div>
      <Tabs tabs={tabs} activeId={activeId} onChange={setActiveId} />
      <Restaurant restaurant={activeRestaurant} />
    </div>
  );
};

// Restaurants.propTypes = {
//   restaurants: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//   }).isRequired,
// };

export default connect((state) => ({
  restaurants: restaurantSelector(state),
}))(Restaurants);
