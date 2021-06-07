import { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { restaurantsSelector } from '../../redux/selectors';
import Tabs from '../tabs';
import Restaurant from '../restaurant'

const Restaurants = ({ restaurants }) => {

    const [activeId, setActiveId] = useState(Object.keys(restaurants)[0]);
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

Restaurants.propTypes = {
  restaurants: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default connect((state) => ({
    restaurants: restaurantsSelector(state),
}))(Restaurants);
