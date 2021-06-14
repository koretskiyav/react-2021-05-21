import { useContext } from 'react';
import { userContext } from '../../context/user';
import { CurrencyContext } from '../../context/currency';
import { ReactComponent as Logo } from '../../icons/logo.svg';
import styles from './header.module.css';

const Header = () => {
  const { name, setName } = useContext(userContext);
  const { currencies, setCurrency } = useContext(CurrencyContext);

  return (
    <header className={styles.header}>
      <Logo />
      <select
        onChange={(e) => {
          console.log(e.target.value);
          setCurrency(currencies.find((item) => item.id === e.target.value));
        }}
      >
        {currencies.map((currency) => (
          <option key={currency.id}>{currency.id}</option>
        ))}
      </select>
      <h2 onClick={() => setName('Igor')}>{name}</h2>
    </header>
  );
};

export default Header;
