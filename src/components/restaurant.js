import Menu from './menu'
import Reviews from './rewiews'
import Rate from './rate'

export default function Restaurants(props) {
  const reducer = (sum, value) => sum + value;
  const sum = props.reviews.reduce(reducer, 0);
  const averageRating = Math.round(sum / props.reviews.length);


  return (
    <div>
      <Rate rate={averageRating}/>
      <Menu menu={props.menu}/>
      <Reviews review={props.review}/>
    </div>
  );
}
