import Reviews from './reviews';
import Menu from './menu';
import Rate from './rate'

export default function Restorant(props) {

  const {menu, reviews} = props.restaurant
  const averageRating = reviews?.map(review => review.rating).reduce((a, b) => (a + b)) / reviews?.length

  return (
    <div>
    Меню:<Menu menu={menu}/>
    Рейтинг:<Rate value={averageRating}/>
    Отзывы: {reviews?.map((review)=> <Reviews key={review.id} review={review}/>)}
    </div>
  );
}