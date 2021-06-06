import { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Menu from '../menu';
import Reviews from '../reviews';
import Banner from '../banner';
import Rate from '../rate';
import Tabs from '../tabs';
import { reviewsUsersSelector, restaurantsSelector } from '../../redux/selectors';

const Restaurant = ({ restaurant, allReviews }) => {
  const { name, menu, reviews } = restaurant;
  const [activeTab, setActiveTab] = useState('menu');

  const averageRating = useMemo(() => {
    const total = reviews.map((id) => allReviews[id].rating).reduce((acc, rating) => acc + rating, 0);
    return Math.round(total / reviews.length);
  }, [reviews, allReviews]);

  const tabs = [
    { id: 'menu', title: 'Menu' },
    { id: 'reviews', title: 'Reviews' },
  ];

  return (
    <div>
      <Banner heading={name}>
        <Rate value={averageRating} />
      </Banner>
      <Tabs tabs={tabs} activeId={activeTab} onChange={setActiveTab} />
      {activeTab === 'menu' && <Menu menu={menu} key={restaurant.id} />}
      {activeTab === 'reviews' && <Reviews reviews={reviews} />}
    </div>
  );
};

Restaurant.propTypes = {
  restaurant: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    menu: PropTypes.array,
    reviews: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
};

const mapStateToProps = (state, props) => ({
  restaurant: restaurantsSelector(state)[props.id] || 0,
  allReviews: reviewsUsersSelector(state)
});

export default connect(mapStateToProps)(Restaurant);
