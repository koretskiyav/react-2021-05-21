import { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Restaurant from '../restaurant';
import Tabs from '../tabs';
import { restaurantSelector } from '../../redux/selectors';

const Restaurants = ({ restaurants }) => {
  const [activeId, setActiveId] = useState(
    restaurants['982bfbce-c5e0-41a0-9f99-d5c20ecee49d'].id
  );

  const activeRestaurant = useMemo(
    () => Object.values(restaurants).find((el) => el.id === activeId),
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

Restaurants.propTypes = {
  restaurants: PropTypes.object.isRequired,
};

export default connect((state) => ({
  restaurants: restaurantSelector(state),
}))(Restaurants);
