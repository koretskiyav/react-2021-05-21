import { createContext, useState } from 'react';
import { USD, EUR, UAH } from './context-constants';
import useCurrency from '../hooks/use-currency';

export const PriceContext = createContext();

export const PriceProvider = ({ children }) => {
  const [currency, setCurrency] = useState(UAH);
  const formatPrice = useCurrency(currency);
  return (
    <PriceContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </PriceContext.Provider>
  );
}


export const PriceConsumer = PriceContext.Consumer;