import { connect } from 'react-redux';
import { useMemo, useState } from 'react';
import { reviewsSelector } from '../../redux/selectors';
import PropTypes from 'prop-types';
import Menu from '../menu';
import Reviews from '../reviews';
import Banner from '../banner';
import Rate from '../rate';
import Tabs from '../tabs';

const Restaurant = ({ restaurant, allReviews }) => {
  const { name, menu, reviews: reviewIds } = restaurant;
  const [activeTab, setActiveTab] = useState('menu');

  const reviews = useMemo(
    () => Object.values(allReviews).filter((review) => reviewIds.includes(review.id)),
    [allReviews, reviewIds]
  );

  const averageRating = useMemo(() => {
    const total = reviews.reduce((acc, { rating }) => acc + rating, 0);
    return Math.round(total / reviews.length);
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
      PropTypes.string.isRequired // по заданию это изменение не требуется но варнинги мешают в консоли
      /*PropTypes.shape({
        rating: PropTypes.number.isRequired,
      }).isRequired*/
    ).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  allReviews: reviewsSelector(state),
});

export default connect(mapStateToProps)(Restaurant);
