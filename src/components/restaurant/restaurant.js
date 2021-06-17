import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Menu from '../menu';
import Reviews from '../reviews';
import Banner from '../banner';
import Rate from '../rate';
import { averageRatingSelector } from '../../redux/selectors';
import { restaurantSelector } from '../../redux/features/restaurants';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import styles from './restaurant.module.css';

const Restaurant = ({ restaurant, averageRating }) => {
  const { id, name, menu, reviews } = restaurant;

  const tabs = [
    { tabId: 'menu', title: 'Menu' },
    { tabId: 'reviews', title: 'Reviews' },
  ];

  return (
    <div>
      <Banner heading={name}>
        {!!averageRating && <Rate value={averageRating} />}
      </Banner>

      <div className={styles.tabs}>
        {tabs.map(({ tabId, title }) => (
          <NavLink
            key={tabId}
            to={`/restaurants/${id}/${tabId}`}
            className={styles.tab}
            activeClassName={styles.active}
          >
            {title}
          </NavLink>
        ))}
      </div>
      <Switch>
        <Route path="/restaurants/:restId/menu">
          {({ match }) => (
            <Menu
              menu={menu}
              key={match.params.restId}
              restaurantId={match.params.restId}
            />
          )}
        </Route>
        <Route path="/restaurants/:restId/reviews">
          {({ match }) => (
            <Reviews reviews={reviews} restaurantId={match.params.restId} />
          )}
        </Route>
        <Redirect to={`/restaurants/:restId/menu`} />
      </Switch>
    </div>
  );
};

Restaurant.propTypes = {
  restaurant: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    menu: PropTypes.array,
    reviews: PropTypes.array,
  }).isRequired,
  averageRating: PropTypes.number,
};

const mapStateToProps = (state, props) => ({
  restaurant: restaurantSelector(state, props),
  averageRating: averageRatingSelector(state, props),
});

export default connect(mapStateToProps)(Restaurant);
