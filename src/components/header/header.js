import { useContext } from 'react';
import { userContext } from '../../context/user';
import { ReactComponent as Logo } from '../../icons/logo.svg';
import Currency from '../currency';
import styles from './header.module.css';

const Header = () => {
  const { name, setName } = useContext(userContext);

  return (
    <header className={styles.header} onClick={() => setName('Igor')}>
      <Currency />
      <Logo />
      <h2>{name}</h2>
    </header>
  );
};

export default Header;
