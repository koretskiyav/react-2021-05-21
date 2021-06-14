import { createContext, useState } from 'react';

export const CurrencyContext = createContext();

const currencies = [
  { id: 'USD', rate: 1, sign: '$' },
  { id: 'EUR', rate: 0.82, sign: '€' },
  { id: 'RUB', rate: 72, sign: '₽' },
];

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(currencies[0]);
  return (
    <CurrencyContext.Provider value={{ currencies, currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};
