import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Menu from '../menu';
import Reviews from '../reviews';
import Banner from '../banner';
import Rate from '../rate';
<<<<<<< HEAD
import Tabs from '../tabs';
import { averageRatingSelector } from '../../redux/selectors';
import { restaurantSelector } from '../../redux/features/restaurants';
=======
import styles from './restaurant.module.css';
import PropTypes from 'prop-types';
>>>>>>> origin/master

const Restaurant = ({ restaurant, averageRating }) => {
  const { id, name, menu, reviews } = restaurant;
  const [activeTab, setActiveTab] = useState('menu');

<<<<<<< HEAD
  const tabs = [
    { id: 'menu', title: 'Menu' },
    { id: 'reviews', title: 'Reviews' },
  ];
=======
  const averageRating = useMemo(() => {
  // eslint-disable-next-line
    const total = reviews.reduce((acc, { rating }) => acc + rating, 0);
    return Math.round(total / reviews.length);
  }, [reviews]);
>>>>>>> origin/master

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
<<<<<<< HEAD
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
=======
  name:PropTypes.string.isRequired,
  menu:PropTypes.array.isRequired,
  reviews: PropTypes.array.isRequired

};


export default Restaurant;
>>>>>>> origin/master
