import { useContext } from 'react';
import { userContext } from '../../context/user';
import { ReactComponent as Logo } from '../../icons/logo.svg';
import styles from './header.module.css';
import { InternalPriceSwitch } from '../internal-price-manager/internal-price-manager';

const Header = () => {
  const { name, setName } = useContext(userContext);

  return (
    <header className={styles.header} onClick={() => setName('Igor')}>
      <div >
        <InternalPriceSwitch className={styles.priceSwitch} />
      </div>
      <Logo />
      <h2>{name}</h2>
    </header>
  );
};

export default Header;
