import { ReactComponent as Star } from '../icons/star.svg';

export default function Rate(props) {

  const StarItems = () => {
    for (let index = 0; index < props.value; index++) {
    return <Star key={index} width={30} height={30}/>
  }}

  return (
    <span>
      {StarItems}
    </span>
  );
}