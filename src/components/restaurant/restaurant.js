import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Menu from '../menu';
import Reviews from '../reviews';
import Banner from '../banner';
import Rate from '../rate';
import Tabs from '../tabs';
import { averageRatingSelector } from '../../redux/selectors';
import { restaurantSelector } from '../../redux/features/restaurants';

const Restaurant = ({ restaurant, averageRating }) => {
  const { id, name, menu, reviews } = restaurant;
  const [activeTab, setActiveTab] = useState('menu');

  const tabs = [
    { id: 'menu', title: 'Menu' },
    { id: 'reviews', title: 'Reviews' },
  ];

  return (
    <div>
      <Banner heading={name}>
        {!!averageRating && <Rate value={averageRating} />}
      </Banner>
      <Tabs tabs={tabs} activeId={activeTab} onChange={setActiveTab} />
      {activeTab === 'menu' && <Menu menu={menu} key={id} restaurantId={id} />}
      {activeTab === 'reviews' && (
        <Reviews reviews={reviews} restaurantId={id} />
      )}
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
