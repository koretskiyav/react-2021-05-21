import React from 'react';
import Rate from './rate';
import style from './reviews.module.css';

export default function Reviews(props) {

  return (
    <div >
        <h3>Reviews</h3>
        <ul className={style.ul}>
            {props.reviews.map((review) => (
                <li key={review.id} className={style.card}>
                    <strong>{review.user}:</strong> {review.text} 
                    <Rate key={review.id} review={review.rating}/>
                 
                </li>
            ))}
        </ul>
    </div>
  );
}
