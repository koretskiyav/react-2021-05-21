import Review from './review';

export default function Reviews(props) {
  return (
    <div>
      <h3>Restauant Reviews</h3>
      {props.reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </div>
  );
}