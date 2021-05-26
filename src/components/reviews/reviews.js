import Review from '../review';

function Reviews({ reviews }) {
  return (
    <>
      { reviews.map((review) => <Review review={review} key={review.id} />) }
    </>
  );
}

export default Reviews;
