import { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Menu from '../menu';
import Reviews from '../reviews';
import Banner from '../banner';
import Rate from '../rate';
import Tabs from '../tabs';
import { ratingsSelector } from '../../redux/selectors';

const Restaurant = ({ restaurant, ratings }) => {
  const { name, menu, reviews } = restaurant;
  const [activeTab, setActiveTab] = useState('menu');

  const tabs = [
    { id: 'menu', title: 'Menu' },
    { id: 'reviews', title: 'Reviews' },
  ];

  const averageRating = useMemo(() => {
    const totalRating = ratings.reduce((acc, rating) => acc + rating, 0);
    return Math.round(totalRating / ratings.length);
  }, [ratings]);

  return (
    <div>
      <Banner heading={name}>
        <Rate value={averageRating} />
      </Banner>
      <Tabs tabs={tabs} activeId={activeTab} onChange={setActiveTab} />
      {activeTab === 'menu' && <Menu menu={menu} key={restaurant.id} />}
      {activeTab === 'reviews' && (
        <Reviews reviews={reviews} restaurantId={restaurant.id} />
      )}
    </div>
  );
};

Restaurant.propTypes = {
  restaurant: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    menu: PropTypes.arrayOf(PropTypes.string),
    reviews: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  ratings: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};

export default connect((state, props) => {
  const ratings = ratingsSelector(state);

  return {
    ratings: ratings[props.restaurant.id],
  };
})(Restaurant);
