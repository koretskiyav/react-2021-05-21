import { Fragment, useContext } from 'react';
import { createContext } from 'react';
import styles from './internal-price-manager.module.css';

export const currencies = {
  EUR: { rate: 1, caption: '€' },
  RUB: { rate: 1 * 90, caption: '₽' },
  USD: { rate: 1 * 90 / 70, caption: '$' },
};

// Context

const currentCurrencyContext = createContext('Current currency');
export const CurrentCurrencyProvider = currentCurrencyContext.Provider;
const CurrentCurrencyConsumer = currentCurrencyContext.Consumer;

// Components

export const InternalPricer = ({ value, className }) => {
  return (
    <span className={className}>
      <CurrentCurrencyConsumer>{
        (currentCurrency) => {
          const currency = currencies[currentCurrency.currentCurrency];
          return (
            <span>
              {`${Math.round(value * currency.rate * 100) / 100} ` + currency.caption}
            </span>
          )
        }
      }</CurrentCurrencyConsumer>
    </span>
  );
}

export const InternalPriceSwitch = ({ className }) => {
  const { setCurrentCurrency } = useContext(currentCurrencyContext);

  return (
    <div className={className}>
      <span className={styles.currency}>
        {
          Object.keys(currencies).map(item => (
            <Fragment key={item}>
              <span className={styles.currencyItem} onClick={() => setCurrentCurrency(item)}>{item}</span>
            </Fragment>
          ))
        }
      </span>
    </div>
  );
}