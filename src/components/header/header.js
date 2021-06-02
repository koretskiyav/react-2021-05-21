import Basket from '../basket';
import { ReactComponent as Logo } from '../../icons/logo.svg';
import styles from './header.module.css';

const Header = () => (
  <header className={styles.header}>
    <Logo />
    <Basket />
  </header>
);

export default Header;
