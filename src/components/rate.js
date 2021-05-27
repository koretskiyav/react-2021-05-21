import style from './rate.module.css';
import { ReactComponent as Star } from '../icons/star.svg';

export default function Rate(props) {
  const { value } = props;

  return <>
    {
      [...Array(5).keys()].map((item, index) =>
        <Star key={index} className={`${style.icon} ${index < value && style.icon_active} `} />)
    }
  </>;
}
