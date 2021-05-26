import { ReactComponent as Star } from '../icons/star.svg';

export default function Menu(props) {
  const totalStars = 5;
  return (
    <div>
      {[...Array(totalStars).keys()].map((rate) => {
        console.log(props.rating >= rate + 1);
        return <Star fill={props.rating >= rate + 1 ? '#bf001c' : '#c6c6c6'} />;
      })}
    </div>
  );
}
