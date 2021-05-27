import Rate from './rate';

function Review(props) {
  return (
    <div>
      <br />
      <hr />
      <h3>
        Review {props.index + 1} by {props.review.user}
      </h3>

      <Rate value={props.review.rating} />

      <p>{props.review.text}</p>
    </div>
  );
}

export default Review;
