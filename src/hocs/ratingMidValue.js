import useRatingCounter from '../hooks/use-ratingCounter';

export default (WrappedComponent) => (props) => {
  const middleRating = useRatingCounter(props.activeRestaurant.reviews, 'rating');
  return <WrappedComponent {...props} {...middleRating} />;
};