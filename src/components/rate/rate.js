import PropTypes from 'prop-types';
import cn from 'classnames';

import { ReactComponent as Star } from '../../icons/star.svg';

import styles from './rate.module.css';

const Rate = ({ value }) => (
  <div data-id="rate">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={cn(styles.star, { [styles.checked]: i <= value - 1 })}
        data-id="star"
        data-checked={i <= value - 1 ? "star-active" : "star-inactive"}
      />
    ))}
  </div>
);

Rate.propType = {
  value: PropTypes.number,
}

export default Rate;
