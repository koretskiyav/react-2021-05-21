import { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Restaurant from '../restaurant';
import Tabs from '../tabs';

const Restaurants = ({ restaurants }) => {
  ///console.log(restaurants);
  const [activeId, setActiveId] = useState(
    restaurants['a757a0e9-03c1-4a2a-b384-8ac21dbe2fb2'].id
  );

  const activeRestaurant = useMemo(
    () => restaurants[activeId],
    [activeId, restaurants]
  );

  const tabs = Object.values(restaurants).map(({ id, name }) => ({
    id,
    title: name,
  }));

  return (
    <div>
      <Tabs tabs={tabs} activeId={activeId} onChange={setActiveId} />
      <Restaurant restaurant={activeRestaurant} />
    </div>
  );
};

// Restaurants.propTypes = {
//   restaurants: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//     }).isRequired
//   ).isRequired,
// };

export default connect((state) => ({
  restaurants: state.restaurants,
}))(Restaurants);
