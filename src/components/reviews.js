import style from './product.module.css';
import Rate from './rate';

export default function Reviews(props) {
  return (
    <div>
      {props.reviews.map((review) => (
        <div>
          <p>
            <Rate rate={review.rating}/>   
            {review.user}                     
          </p>
          <p>"{review.text}"</p>         
        </div>
      ))}
    </div>
  );
}

