import Menu from './menu';
import Reviews from './reviews'

export default function Restaurant(props) {
  return (
    <div>
      <Menu menu={props.restaurant.menu} />
      <Reviews reviews={props.restaurant.reviews}/>
    </div>
  );
}