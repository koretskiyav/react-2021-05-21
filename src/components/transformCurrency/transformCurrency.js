import { CurrencyConsumer } from '../../context/currency';

const TransformCurrency = ({ value = 0 }) => {
  const displayOptions = {
    style: 'currency',
    maximumFractionDigits: 2,
  };

  const currencies = {
    US: value.toLocaleString('en-US', { ...displayOptions, currency: 'USD' }),
    EU: (value * 0.83).toLocaleString('de-DE', {
      ...displayOptions,
      currency: 'EUR',
    }),
    RU: (value * 72.11).toLocaleString('ru-RU', {
      ...displayOptions,
      currency: 'RUB',
    }),
    UA: (value * 27.0).toLocaleString('ua-UA', {
      ...displayOptions,
      currency: 'UAH',
    }),
  };

  const transformedValue = (currency) => currencies[currency];

  return (
    <CurrencyConsumer>
      {({ currency }) => {
        return transformedValue(currency);
      }}
    </CurrencyConsumer>
  );
};

export default TransformCurrency;
