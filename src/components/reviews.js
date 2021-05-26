import { useEffect, useState } from "react";
import Rate from "./rate";

function Reviews(props) {
  const [sumRate,setSumRate] = useState(0)

  useEffect(()=> {
    setSumRate(((props.reviews.reduce((sum,current)=> sum + current.rating, 0)) / props.reviews.length).toFixed(2))
  },[props.reviews]);

  const reviewsList = props.reviews.map((review) => { 
    return (
      <div key={review.id}>
        <p>{review.user}</p>
        <p>{review.text}</p>
        <p><Rate rating={review.rating}/></p>
      </div>
      )
    }
  );

  return (
    <div>
      <Rate rating={sumRate}/>
      {reviewsList}
    </div>
  );
}
export default Reviews;