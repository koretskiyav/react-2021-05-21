import cn from 'classnames';

import { ReactComponent as Star } from '../../icons/star.svg';

import styles from './rate.module.css';
import PropTypes from 'prop-types';

const Rate = ({ value }) => (
  <div data-id="rate">
    {[...Array(5)].map((_, i) => (
      <Star
        data-id="star"
        key={i}
        className={cn(styles.star, { [styles.checked]: i <= value - 1 })}
      />
    ))}
  </div>
);


Rate.propTypes = {
  value: PropTypes.number
}
export default Rate;
