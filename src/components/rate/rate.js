import propTypesRange from 'prop-types-range';
//import PropTypes from 'prop-types';
import cn from 'classnames';

import { ReactComponent as Star } from '../../icons/star.svg';

import styles from './rate.module.css';

const Rate = ({ value }) => (
  <div>
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={cn(styles.star, { [styles.checked]: i <= value - 1 })}
      />
    ))}
  </div>
);

Rate.propTypes = {
  //value: PropTypes.number, // for "i <= value - 1" but no rule for "Array(5)"
  value: propTypesRange(0, 5), // for "Array(5)" and "i <= value - 1"
  // value.isRequired - for null/undefined clients will see empty Stars, it's ok
};

export default Rate;
