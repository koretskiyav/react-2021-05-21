import { useContext } from 'react';
import { userContext } from '../../context/user';
import { PriceContext } from '../../context/price';
import { ReactComponent as Logo } from '../../icons/logo.svg';
import styles from './header.module.css';
import { USD, EUR, UAH } from '../../context/context-constants'

const Header = () => {
  const { name, setName } = useContext(userContext);
  const { currency, setCurrency } = useContext(PriceContext);

  return (
    <header className={styles.header} onClick={() => setName('Igor')}>
      <Logo />
      <select className={styles.currency} value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value={USD}>USD</option>
        <option value={EUR}>EUR</option>
        <option value={UAH}>UAH</option>
      </select>
      <h2>{name}</h2>
    </header>
  );
};

export default Header;
