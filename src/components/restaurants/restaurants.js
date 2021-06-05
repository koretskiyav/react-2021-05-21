import { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Restaurant from '../restaurant';
import Tabs from '../tabs';

const Restaurants = ({ restaurants }) => {
  const [activeId, setActiveId] = useState(Object.keys(restaurants)[0]);

  const activeRestaurant = useMemo(() => restaurants[activeId], [activeId, restaurants]);

  // Тут можно было бы использовать useMemo как для activeRestaurant, но по заданию это изменение не требуется.
  const tabs = Object.values(restaurants).map(({ id, name }) => ({ id, title: name }));

  return (
    <div>
      <Tabs tabs={tabs} activeId={activeId} onChange={setActiveId} />
      <Restaurant restaurant={activeRestaurant} />
    </div>
  );
};

Restaurants.propTypes = {
  restaurants: PropTypes.object.isRequired, // по заданию это изменение не требуется но варнинги мешают в консоли
  /*restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,*/
};

export default connect((state) => ({
  restaurants: state.restaurants,
}))(Restaurants);
