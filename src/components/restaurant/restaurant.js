import { connect } from 'react-redux';
import { Route, Switch, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Menu from '../menu';
import Reviews from '../reviews';
import Banner from '../banner';
import Rate from '../rate';
import { averageRatingSelector } from '../../redux/selectors';
import { restaurantSelector } from '../../redux/features/restaurants';
import styles from './restaurant.module.css';

const Restaurant = ({ restaurant, averageRating }) => {
  const { id, name, menu, reviews } = restaurant;

  const tabs = [
    { tabId: 'menu', title: 'Menu', location: `/restaurants/${id}/menu` },
    { tabId: 'reviews', title: 'Reviews', location: `/restaurants/${id}/reviews` },
  ];

  return (
    <div>
      <Banner heading={name}>
        {!!averageRating && <Rate value={averageRating} />}
      </Banner>
      <div className={styles.tabs}>
        {tabs.map(({ tabId, title, location }) => (
          <NavLink
            key={tabId}
            to={location}
            className={styles.tab}
            activeClassName={styles.active}
          >
            {title}
          </NavLink>
        ))}
      </div>
      <Switch>
        <Route path="/restaurants/:id/menu" >
          {({ match }) => <Menu menu={menu} key={match.params.id} restaurantId={match.params.id} />}
        </Route>
        <Route path="/restaurants/:id/reviews" >
          {({ match }) => <Reviews reviews={reviews} restaurantId={match.params.id} />}
        </Route>
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
