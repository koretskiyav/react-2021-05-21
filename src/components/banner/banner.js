import styles from './banner.module.css';
import PropTypes from 'prop-types';
import Basket from '../basket';
import banner from './banner.jpg';

const Banner = ({ heading, description, children }) => (
  <div className={styles.main}>
    <div className="row">
      <div className="col-12">
        <div className={styles.banner}>
          <img src={banner} className={styles.img} alt="banner" />
          <div className={styles.caption}>
            <h2 className={styles.heading}>{heading}</h2>
            <p className={styles.description}>{description}</p>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

Banner.propTypes = {
  heading: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.element,
};

export default Banner;

Banner.propTypes = {
  heading: PropTypes.string.isRequired,
  description: PropTypes.string,
};
