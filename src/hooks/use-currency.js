import { CurrencyContext } from '../context/currency';
import { useContext } from 'react';

export function useCurrency(sum) {
  const { currency } = useContext(CurrencyContext);
  return `${Math.round(sum * currency.rate)} ${currency.sign}`;
}
