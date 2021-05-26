import { useEffect, useState } from "react";
import Rate from "./rate";
import style from './reviews.module.css'
function Reviews(props) {
  const [sumRate,setSumRate] = useState(0)

  // Вычисляем среднюю арифметическую по рейтингу
  useEffect(()=> {
    setSumRate(((props.reviews.reduce((sum,current)=> sum + current.rating, 0)) / props.reviews.length).toFixed(2));
  },[props.reviews]);

  // Мапим все отзывы 
  const reviewsList = props.reviews.map((review) => { 
    return (
      <div className={style.card} key={review.id}>
        <h3>{review.user}</h3>
        <p className={style.comment}>{review.text}</p>
        <div><Rate rating={review.rating}/></div>
      </div>
      )
    }
  );

  return (
    <div >
      <Rate rating={sumRate}/>
      <div>
        {reviewsList}
      </div>
    </div>
  );
}
export default Reviews;