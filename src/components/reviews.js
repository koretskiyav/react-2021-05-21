import Rate from './rate';

export default function Reviews(props) {
  return (
    <div>
      {props.reviews.map((review) => (
        <div key={review.id}>
          <Rate review={review.rating} />
          <p>Name: {review.user}</p>
          <p>Text: {review.text}</p>
        </div>
      ))}
    </div>
  );
}
