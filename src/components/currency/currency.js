import { useContext } from 'react';
import { currencyContext } from '../../context/currency';

const currencies = ['US', 'EU', 'RU', 'UA'];

const Currency = () => {
  const { currency, setCurency } = useContext(currencyContext);

  return (
    <select value={currency} onChange={(evt) => setCurency(evt.target.value)}>
      {currencies.map((currencyItem) => (
        <option value={currencyItem} key={currencyItem}>
          {currencyItem}
        </option>
      ))}
    </select>
  );
};

export default Currency;
