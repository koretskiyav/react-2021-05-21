import { createContext } from 'react';

export const currencyContext = createContext('US');

export const CurrencyProvider = currencyContext.Provider;
export const CurrencyConsumer = currencyContext.Consumer;
