import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Menu from '../menu';
import Reviews from '../reviews';
import Banner from '../banner';
import Rate from '../rate';
import Tabs from '../tabs';
import { connect } from 'react-redux';
import { restaurantReviewsSelector } from '../../redux/selectors';

const Restaurant = ({ restaurant, reviews }) => {
  const { name, menu } = restaurant;
  const [activeTab, setActiveTab] = useState('menu');

  const averageRating = useMemo(() => {
    const total = Object.keys(reviews).reduce((acc, reviewId) => acc + reviews[reviewId].rating, 0);
    return Math.round(total / Object.keys(reviews).length);
  }, [reviews]);

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
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        rating: PropTypes.number.isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
};

export default connect((state, props) => ({
  reviews: restaurantReviewsSelector(state, props),
}))(Restaurant);
