import Reviews from './reviews';
import Menu from './menu';
import Rate from './rate';

import style from './restaurant.module.css';

export default function Restaurant(props) {

  const { activeRestaurant } = props;

  const averageRate = () => {
    const sum = activeRestaurant.reviews.reduce((prev, cur) => {
      return prev + cur.rating;
    }, 0);

    return sum / activeRestaurant.reviews.length;
  }

  return (
    <>
      <div className={style.rate}>
        <h2>Average Rate: <Rate value={averageRate()}></Rate></h2>
        <Reviews reviews={activeRestaurant.reviews}></Reviews>
      </div>
      <Menu menu={activeRestaurant.menu} />
    </>
  )
}