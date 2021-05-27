import Review from './review';

function Reviews(props) {
  return (
    <div>
      {props.reviews.map((review, index) => (
        <Review key={review.id} review={review} index={index} />
      ))}
    </div>
  );
}

export default Reviews;
