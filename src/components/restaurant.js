import Reviews from './reviews';
import Menu from './menu';

export default function Restaurant(props) {
  const {selectedRestaurant} = props;
  return (
    <>
      <Menu menu={selectedRestaurant.menu}/>
      <h1>Отзывы</h1>
      <Reviews reviews={selectedRestaurant.reviews} />
    </>
  );
}
