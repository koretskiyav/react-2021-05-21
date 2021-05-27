import { ReactComponent as Star } from '../icons/star.svg';

export default function Rate(props) {

    let stars = [];
    for (let i = 0; i < props.rate.rating; i++) {
        stars.push(<Star key={i} />);
    }

  return (
      <div>
          {stars}
      </div>
  );
}
