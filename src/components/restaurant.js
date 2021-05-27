import ratingMidValue from '../hocs/ratingMidValue';
import Menu from './menu';
import Reviews from './reviews';
import Rate from './rate';

function Restaurant({activeRestaurant, middleRating}) {
  const { name, menu, reviews } = activeRestaurant;
  return (
    <div>
      <h1>{name}</h1>
      <Rate rating={middleRating} />
      <h2>Menu</h2>
      <Menu menu={menu} />
      <h2>Reviews</h2>
      <Reviews reviews={reviews} />
    </div>
  )
}

export default ratingMidValue(Restaurant);