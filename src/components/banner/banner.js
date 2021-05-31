import styles from './banner.module.css';
import PropTypes from 'prop-types';

import banner from './banner.jpg';

const Banner = ({ heading, description, children }) => (
  <div className={styles.banner}>
    <img src={banner} className={styles.img} alt="banner" />
    <div className={styles.caption}>
      <h2 className={styles.heading}>{heading}</h2>
      <p className={styles.description}>{description}</p>
      <div>{children}</div>
    </div>
  </div>
);

Banner.propTypes = {
  heading: PropTypes.string, // for "<h2>{heading}</h2>" - designed to show strings
  description: PropTypes.string, // for "<p>{description}</p>" - designed to show strings
  children: PropTypes.object, // for "<div>{children}</div>" - designed to show VDOM objects/null/undefined
};

export default Banner;
