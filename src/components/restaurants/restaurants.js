import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Restaurant from '../restaurant';
import Tabs from '../tabs';
import { restaurantsSelector, tabsSelector } from '../../redux/selectors';

const Restaurants = ({ restaurants, tabs }) => {
  const [activeId, setActiveId] = useState(Object.keys(restaurants)[0]);

  return (
    <div>
      <Tabs tabs={tabs} activeId={activeId} onChange={setActiveId} />
      <Restaurant id={activeId} />
    </div>
  );
};

Restaurants.propTypes = {
  restaurants: PropTypes.shape(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  tabs: PropTypes.array,
};

export default connect((state) => ({
  restaurants: restaurantsSelector(state),
  tabs: tabsSelector(state)
}))(Restaurants);
