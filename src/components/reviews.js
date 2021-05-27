import Rate from './rate';

import style from './product.module.css';

export default function Reviews(props) {
  
  return (
    <div>
      {props.reviews.map((review) => (
      <div key={review.id} className={style.card}>
        <p>{review.user}</p> 
        <p>{review.text}</p> 
        <Rate value={review.rating} />
      </div>
    ))} 
    </div>
  )
}