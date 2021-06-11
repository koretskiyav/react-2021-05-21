import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Restaurant from '../restaurant';
import Tabs from '../tabs';
import Loader from '../loader';
import {
  restaurantsListSelector,
  restaurantsIsLoadingSelector,
  restaurantsIsLoadedSelector,
} from '../../redux/selectors';
import { loadRestaurants } from '../../redux/actions';

const Restaurants = ({
  restaurants,
  isLoadingRestaurants,
  isLoadedRestaurants,
  loadRestaurants,
}) => {
  const [activeId, setActiveId] = useState(restaurants[0]?.id);

  useEffect(() => {
    if (!isLoadingRestaurants && !isLoadedRestaurants) {
      loadRestaurants();
    }
  }, [isLoadingRestaurants, isLoadedRestaurants]); // eslint-disable-line

  const restaurantId = activeId || restaurants[0]?.id;

  if (isLoadingRestaurants || !isLoadedRestaurants) return <Loader />;

  const tabs = restaurants.map(({ id, name }) => ({ id, title: name }));

  return (
    <div>
      <Tabs tabs={tabs} activeId={restaurantId} onChange={setActiveId} />
      <Restaurant id={restaurantId} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  restaurants: restaurantsListSelector(state),
  isLoadingRestaurants: restaurantsIsLoadingSelector(state),
  isLoadedRestaurants: restaurantsIsLoadedSelector(state),
});

export default connect(mapStateToProps, { loadRestaurants })(Restaurants);
