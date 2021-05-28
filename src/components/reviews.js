import Rate from './rate';

export default function Reviews(props) {
  return (
    <div>
      {props.reviews.map((review) => (
        <div key={review.id}>
          <div>{review.user}</div>
          <div>{review.text}</div>
          <Rate value={review.rating} />
        </div>
      ))}
    </div>
  );
}
