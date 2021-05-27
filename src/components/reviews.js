
import style from './product.module.css';
import Rate from './rate';

export default function Reviews(props) {
  return (
    <div>
      <h2> Отзывы о ресторане: </h2>
      {props.reviews.map(review => <div className={style.card}  key={review.id}>
        <p>Посетитель: {review.user}</p>
        <p>Отзыв: {review.text}</p>
        <p>Оценка: 
          <Rate stars={review.rating}/>
        </p>
      </div>)} 
    </div>
  )
}